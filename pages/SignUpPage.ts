import { Page, Locator } from "playwright";
import { BasePage } from "./BasePage";
import { expect } from "playwright/test";

export class SignUpPage extends BasePage {
  readonly termsAndConditionsCheckbox: Locator;
  readonly occasionalEmailsCheckbox: Locator;
  readonly tryForFreeButton: Locator;
  readonly acceptCookiesButton: Locator;
  readonly termsAndConditionsLabel: Locator;
  

  constructor(page: Page) {
    super(page);
    
    this.termsAndConditionsCheckbox = page.locator("label").filter({ hasText: "I agree" });
    this.occasionalEmailsCheckbox = page.locator("label").filter({ hasText: "I'm happy to get occasional" });
    this.tryForFreeButton = page.getByRole("button", { name: "Try for free" });
    this.acceptCookiesButton = page.getByTestId("uc-accept-all-button");

  }


    async acceptTermsAndConditions(numberOfTimes: number = 1) {
      // for (let i = 0; i < numberOfTimes; i++) {
      //   // Create a promise for each popup
      //   const popupPromise = this.page.waitForEvent('popup');
      //   await this.termsAndConditionsCheckbox.click();
      //   const popup = await popupPromise;
      //   await popup.waitForLoadState();
      //   await popup.close();
      // }
      const checkbox = this.page.locator("label").filter({ hasText: "I agree" });
      await checkbox.dispatchEvent('click')
      await expect(checkbox).toBeChecked();

    }

  async acceptOccasionalEmails() {
    await this.occasionalEmailsCheckbox.click();
    await expect(this.occasionalEmailsCheckbox).toBeChecked();
  }

  async clickTryForFree() {
    await expect(this.tryForFreeButton).toBeEnabled();
    await this.tryForFreeButton.click();
  }

  async acceptCookies() {
    await this.acceptCookiesButton.click();
  }
}
