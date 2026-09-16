import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly contactSectionHeading;
  readonly checkInInput;
  readonly checkOutInput;
  readonly checkAvailabilityButton;
  readonly firstRoomBookNowLink;

  constructor(page: Page) {
    super(page);
    this.contactSectionHeading = page.getByRole('heading', { name: 'Send Us a Message' });
    this.checkInInput = page.getByRole('textbox').nth(0);
    this.checkOutInput = page.getByRole('textbox').nth(1);
    this.checkAvailabilityButton = page.getByRole('button', { name: 'Check Availability' });
    this.firstRoomBookNowLink = page.getByRole('link', { name: 'Book now', exact: true }).first();
  }

  async goto(): Promise<void> {
    await this.page.goto('https://automationintesting.online/');
    await this.waitForReady();
  }

  async searchAvailability(checkIn: string, checkOut: string): Promise<void> {
    await this.checkInInput.fill(checkIn);
    await this.checkOutInput.fill(checkOut);
    await this.checkAvailabilityButton.click();
  }

  async openFirstRoom(): Promise<void> {
    await this.firstRoomBookNowLink.click();
    await this.waitForReady();
  }
}