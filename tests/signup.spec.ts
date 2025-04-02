import { test, expect } from "@playwright/test";
import { SignInPage } from "../pages/SignInPage";
import { SignUpPage } from "../pages/SignUpPage";
import { UserDetailsPage } from "../pages/UserDetailsPage";
import { CompanyDetailsPage } from "../pages/CompanyDetailsPage";
import { faker } from "@faker-js/faker";

test.describe("Circula Sign Up Flow", () => {
  let signInPage: SignInPage;
  let signUpPage: SignUpPage;
  let userDetailsPage: UserDetailsPage;
  let companyDetailsPage: CompanyDetailsPage;

  test.beforeEach(async ({ page }) => {
    // initialize pages
    signInPage = new SignInPage(page);
    signUpPage = new SignUpPage(page);
    userDetailsPage = new UserDetailsPage(page);
    companyDetailsPage = new CompanyDetailsPage(page);

    // go to sign In page and accept cookies
    await signInPage.gotoSignInPage();
    await signInPage.acceptCookies();
    await signInPage.clickStartFreeTrial();
    await signUpPage.acceptCookies();
  
  });



  test("should complete the sign-up process successfully", async ({ page }) => {
    // creates user data
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({
      firstName: firstName,
      lastName: lastName,
      provider: "owncompany.io",
    });
    const password = faker.internet.password();
    const companyName = faker.company.name();
    const phoneNumber = faker.phone.number();
    const country = "Sweden";

    // sign Up
    await signInPage.fillCredentials(email, password);

    // accept terms and email options
    await signUpPage.acceptTermsAndConditions();
    await signUpPage.acceptOccasionalEmails();
    await signUpPage.clickTryForFree();

    // fill user details
    await userDetailsPage.fillUserDetails(firstName, lastName, phoneNumber);
    await userDetailsPage.clickNextStep();

    // fill company details
    await companyDetailsPage.fillCompanyDetails(companyName);
    await companyDetailsPage.selectCompanyLocation(country);
    await companyDetailsPage.selectChannel();
    await companyDetailsPage.clickCreateAccount();
    await companyDetailsPage.verifyAccountCreationSuccess(email);

    
  });

});
