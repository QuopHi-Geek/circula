import { Page, Locator } from 'playwright'; 
import { expect } from '@playwright/test';

import { BasePage } from '../pages/BasePage.ts';
import { assert } from 'console';

export class CompanyDetailsPage extends BasePage {
  readonly companyNameInput: Locator;
  readonly companyLocationDropdown: Locator;
  readonly chooseChannelButton: Locator;
  readonly socialMediaChannelOption: Locator;
  readonly createAccountButton: Locator;
  readonly verificationMessage: Locator;


  constructor(page: Page) {
    super(page);
    this.companyNameInput = page.getByRole('textbox', { name: 'Company name' });
    this.companyLocationDropdown = page.getByRole('combobox', { name: 'Where’s your company' });
    this.chooseChannelButton = page.getByRole('button', { name: 'Choose channel' });
    this.socialMediaChannelOption = page.getByText('Social Media (LinkedIn,');
    this.createAccountButton = page.getByRole('button', { name: 'Create an account' });
    this.verificationMessage = page.getByText('Great! Now please verify your');
  }

  async fillCompanyDetails(companyName: string) {
    await this.companyNameInput.click();
    await this.companyNameInput.fill(companyName);
  }

  async selectCompanyLocation(countryName: string) {
    const country = this.page.getByRole('option', { name: countryName });
    await this.companyLocationDropdown.click();
    try {
        await country.waitFor({ state: 'attached', timeout: 5000 });
        await country.hover();
        await country.scrollIntoViewIfNeeded();
        await country.click();
    
      } catch (error) {
          throw new Error(`Country "${countryName}" not found in dropdown.`);
      }
  }

  async selectChannel() {
    await this.chooseChannelButton.click();
    await this.socialMediaChannelOption.click();
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }

  async verifyAccountCreationSuccess(email: string) {
    const verificationEmail = this.page.locator(`//b[normalize-space()='${email}']`);
    await expect(verificationEmail).toContainText(email);
  }


}
