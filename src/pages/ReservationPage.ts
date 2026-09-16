import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReservationPage extends BasePage {
  readonly reserveNowButton;
  readonly firstNameInput;
  readonly lastNameInput;
  readonly emailInput;
  readonly phoneInput;
  readonly bookingConfirmedMessage;

  constructor(page: Page) {
    super(page);
    this.reserveNowButton = page.getByRole('button', { name: 'Reserve Now' });
    this.firstNameInput = page.getByPlaceholder('Firstname');
    this.lastNameInput = page.getByPlaceholder('Lastname');
    this.emailInput = page.getByPlaceholder('Email');
    this.phoneInput = page.getByPlaceholder('Phone');
    this.bookingConfirmedMessage = page.getByText('Booking Confirmed');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://automationintesting.online/');
    await this.waitForReady();
  }

  async openGuestDetails(): Promise<void> {
    await this.reserveNowButton.click();
  }

  async fillGuestDetails(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
  }

  async submitReservation(): Promise<void> {
    await this.reserveNowButton.click();
  }
}