import { test, expect } from '../../src/fixtures/base';
import { HomePage } from '../../src/pages/HomePage';
import { ReservationPage } from '../../src/pages/ReservationPage';
import customer from '../data/booking-customer.json';

function formatDate(date: Date): string {
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

test.describe('Customer room reservation regression', () => {
  test('books the first available room for Nural Patole @regression', async ({ page }) => {
    const home = new HomePage(page);
    const reservation = new ReservationPage(page);
    const nextMonday = new Date();
    const daysUntilNextMonday = (8 - nextMonday.getDay()) % 7 || 7;
    nextMonday.setDate(nextMonday.getDate() + daysUntilNextMonday);
    const nextTuesday = new Date(nextMonday);
    nextTuesday.setDate(nextMonday.getDate() + 1);
    const checkIn = formatDate(nextMonday);
    const checkOut = formatDate(nextTuesday);

    await test.step('Select next Monday and Tuesday for the stay', async () => {
      await home.goto();
      await home.searchAvailability(checkIn, checkOut);
      await expect(home.checkInInput).toHaveValue(checkIn);
      await expect(home.checkOutInput).toHaveValue(checkOut);
    });

    await test.step('Open the first available room', async () => {
      await home.openFirstRoom();
      await expect(reservation.reserveNowButton).toBeVisible();
    });

    await test.step('Open and complete the reservation form', async () => {
      await reservation.openGuestDetails();
      await reservation.fillGuestDetails(customer);
      await expect(reservation.firstNameInput).toHaveValue(customer.firstName);
      await expect(reservation.lastNameInput).toHaveValue(customer.lastName);
      await expect(reservation.emailInput).toHaveValue(customer.email);
      await expect(reservation.phoneInput).toHaveValue(customer.phone);
    });

    await test.step('Submit the reservation', async () => {
      await reservation.submitReservation();
      await expect(reservation.bookingConfirmedMessage).toBeVisible();
    });
  });
});