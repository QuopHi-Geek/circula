import { Page, Locator } from 'playwright';
import { BasePage } from '../pages/BasePage.ts';

export class UserDetailsPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly phoneNumberInput: Locator;
    readonly nextStepButton: Locator;
  
    constructor(page: Page) {
      super(page);
      this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
      this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
      this.phoneNumberInput = page.getByRole('textbox', { name: 'Phone number' });
      this.nextStepButton = page.getByRole('button', { name: 'Next step' });
    }
  
    async fillUserDetails(firstName: string, lastName: string, phoneNumber: string) {
      await this.firstNameInput.click();
      await this.firstNameInput.fill(firstName);
      await this.lastNameInput.click();
      await this.lastNameInput.fill(lastName);
      await this.phoneNumberInput.click();
      await this.phoneNumberInput.fill(phoneNumber);
    }
  
    async clickNextStep() {
      await this.nextStepButton.click();
    }
  }