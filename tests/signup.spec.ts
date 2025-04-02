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
    const password = faker.internet.password({length:10});
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


  test("should verify valid work email provided", async ({ page }) => {
    // creates user data
    const password = faker.internet.password();

    // sign Up
    await signInPage.fillCredentials("", password);

    // assert that an error is displayed
    const emailError = page.getByText("Work email is required.");

    await signUpPage.clickTryForFree();

    await expect(emailError).toBeVisible();
    await expect(emailError).toHaveText("Work email is required.");
    await expect(signUpPage.tryForFreeButton).toBeDisabled();

  
  });



  test("should verify valid password", async ({ page }) => {
    // creates user data
    const email = faker.internet.email({ provider: "owncompany.io" });

    // sign Up
    await signInPage.fillCredentials(email, "");

    //attempt sign up without password 
    await signUpPage.clickTryForFree();
    
    // assert that an error is displayed
    const passwordError = page.getByText('Min. 8 charactersAt least 1');
    await expect(passwordError).toBeVisible();
    await expect(passwordError).toHaveText("Min. 8 charactersAt least 1 letterAt least 1 number");
    await expect(signUpPage.tryForFreeButton).toBeDisabled();

  
  });



  test("should verify terms and conditions are accepted", async ({ page }) => {
    // creates user data
    const email = faker.internet.email({ provider: "owncompany.io" });
    const password = faker.internet.password();

    // Sign Up
    await signInPage.fillCredentials(email, password);

    // accept email options
    await signUpPage.acceptOccasionalEmails();
    await signUpPage.clickTryForFree();

    // assert that an error is displayed
    const termsError = page.locator(
      "text=Please accept the terms and conditions"
    );

    await expect(termsError).toBeVisible();
    await expect(termsError).toHaveText(
      "Please accept the Terms and Conditions to continue."
    );
    await expect(signUpPage.tryForFreeButton).toBeDisabled();

  });


  test.skip("should verify phone number not empty", async ({ page }) => {
    //create user data 
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ provider: "owncompany.io" });
    const password = faker.internet.password();

    //sign up
    await signInPage.fillCredentials(email, password);
    await signUpPage.acceptTermsAndConditions();
    await signUpPage.acceptOccasionalEmails();
    await signUpPage.clickTryForFree();

    //fill user details 
    await userDetailsPage.fillUserDetails(firstName, lastName, "");
    await userDetailsPage.clickNextStep();

    // assert that an error is displayed
    //TODO: Check error validations
  });

  

  test("should verify valid company name", async ({ page }) => {
    // generates user data
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({
      firstName: firstName,
      lastName: lastName,
      provider: "owncompany.io",
    });
    const password = faker.internet.password();
    const phoneNumber = faker.phone.number();
    const country = "Sweden";

    // Sign Up
    await signInPage.fillCredentials(email, password);

    // accept terms and email options
    await signUpPage.acceptTermsAndConditions();
    await signUpPage.acceptOccasionalEmails();
    await signUpPage.clickTryForFree();

    // fill User Details
    await userDetailsPage.fillUserDetails(firstName, lastName, phoneNumber);
    await userDetailsPage.clickNextStep();

    // company details
    await companyDetailsPage.selectCompanyLocation(country);
    await companyDetailsPage.selectChannel();

    // create account with no company name
    await companyDetailsPage.clickCreateAccount();

    // verify valid company name
    const companyNameError = page.getByText("Company name is required.");
    await expect(companyNameError).toBeVisible();
    await expect(companyNameError).toHaveText("Company name is required.");
    await expect(companyDetailsPage.createAccountButton).toBeDisabled();

    
  });




  test("should verify valid company location selected", async ({ page }) => {
    // generate user data
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

    // sign Up
    await signInPage.fillCredentials(email, password);

    // accept terms and email options
    await signUpPage.acceptTermsAndConditions();
    await signUpPage.acceptOccasionalEmails();
    await signUpPage.clickTryForFree();

    // fill User Details
    await userDetailsPage.fillUserDetails(firstName, lastName, phoneNumber);
    await userDetailsPage.clickNextStep();

    // fill Company Details
    await companyDetailsPage.fillCompanyDetails(companyName);
    await expect(companyDetailsPage.companyLocationDropdown).toHaveValue(
      "Germany"
    );

    //change country location
    await companyDetailsPage.selectCompanyLocation("Italy");
    await companyDetailsPage.selectChannel();

    // verify selected company location registered
    await expect(companyDetailsPage.companyLocationDropdown).not.toBeEmpty();
    await expect(companyDetailsPage.companyLocationDropdown).toHaveValue(
      "Italy"
    );
    await companyDetailsPage.clickCreateAccount();

  });



  test("should verify channel selected", async ({ page }) => {
    // generate user data
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ provider: "owncompany.io" });
    const password = faker.internet.password();
    const companyName = faker.company.name();
    const phoneNumber = faker.phone.number();
    const country = "Sweden";

    // sign Up
    await signInPage.fillCredentials(email, password);
    await signUpPage.acceptTermsAndConditions();
    await signUpPage.acceptOccasionalEmails();
    await signUpPage.clickTryForFree();
    await userDetailsPage.fillUserDetails(firstName, lastName, phoneNumber);
    await userDetailsPage.clickNextStep();

    //fill company detatils
    await companyDetailsPage.fillCompanyDetails(companyName);
    await companyDetailsPage.selectCompanyLocation(country);
    await companyDetailsPage.clickCreateAccount();

    // verify channel selection
    const channelError = page.getByText("Please mention how you");
    await expect(channelError).toBeVisible();
    await expect(channelError).toHaveText(
      "Please mention how you discovered Circula"
    );
    await expect(companyDetailsPage.createAccountButton).toBeDisabled();

    
  });

});
