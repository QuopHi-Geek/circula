import { Page, Locator } from 'playwright';


export class BasePage {
    readonly page: Page;
    readonly cookieConsentButton: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.cookieConsentButton = page.getByTestId('uc-accept-all-button');
    }
  
    async acceptCookies() {
      try {
        await this.cookieConsentButton.click({ timeout: 5000 });
      } catch (error) {
        console.warn('Cookie consent button not found');
      }
    }
  }