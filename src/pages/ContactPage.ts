import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
  readonly nameInput;
  readonly emailInput;
  readonly phoneInput;
  readonly subjectInput;
  readonly messageInput;
  readonly submitButton;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByLabel('Name');
    this.emailInput = page.getByLabel('Email');
    this.phoneInput = page.getByLabel('Phone');
    this.subjectInput = page.getByLabel('Subject');
    this.messageInput = page.getByTestId('ContactDescription');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://automationintesting.online/');
    await this.waitForReady();
  }

  async fillContactForm(data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  successMessageFor(name: string) {
    return this.page.getByText(`Thanks for getting in touch ${name}!`);
  }
}