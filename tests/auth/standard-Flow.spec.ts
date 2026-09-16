import { test, expect } from '../../src/fixtures/base';
import { ContactPage } from '../../src/pages/ContactPage';
import { HomePage } from '../../src/pages/HomePage';
import customer from '../data/contact-customer.json';

test.describe.skip('Automation in Testing customer contact journey', () => {
  test('completes the customer contact journey @smoke @critical', async ({ page }) => {
    const home = new HomePage(page);
    const contact = new ContactPage(page);

    await test.step('Open the contact form', async () => {
      await home.goto();
      await expect(home.contactSectionHeading).toBeVisible();
    });

    await test.step('Complete the customer details', async () => {
      await contact.fillContactForm(customer);
      await expect(contact.nameInput).toHaveValue(customer.name);
      await expect(contact.emailInput).toHaveValue(customer.email);
      await expect(contact.phoneInput).toHaveValue(customer.phone);
      await expect(contact.subjectInput).toHaveValue(customer.subject);
      await expect(contact.messageInput).toHaveValue(customer.message);
    });

    await test.step('Submit the contact request', async () => {
      await contact.submit();
      await expect(contact.successMessageFor(customer.name)).toBeVisible();
    });
  });
});