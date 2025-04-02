import { Page, Locator } from 'playwright';
import { BasePage } from '../pages/BasePage.ts';

const baseURL = 'https://circula-qa-challenge.vercel.app/';


export class SignInPage extends BasePage {

    readonly startFreeTrialLink: Locator;
    readonly workEmailInput: Locator;
    readonly passwordInput: Locator;
  
    constructor(page: Page) {
      super(page);
      this.startFreeTrialLink = page.getByRole('link', { name: 'Start a free trial' });
      this.workEmailInput = page.getByRole('textbox', { name: 'Work email' });
      this.passwordInput = page.getByRole('textbox', { name: 'Password Show password' });
    }
  
    async gotoSignInPage() {
      await this.page.goto(baseURL+ '/users/sign_in');
    }
  
    async clickStartFreeTrial() {
      await this.startFreeTrialLink.click();
    }
  
    async fillCredentials(email: string, password: string) {
      await this.workEmailInput.click();
      await this.workEmailInput.fill(email);
      await this.passwordInput.click();
      await this.passwordInput.fill(password);
    }
  }