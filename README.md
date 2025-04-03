Git Repo: https://github.com/QuopHi-Geek/circula.git

<br>

<br>

1. TEST CASES - SIGN UP FLOW

<br>
-  Verify and complete the sign-up process successfully
-  Verify a valid work email is required.
-  Verify valid work email is provided
-  Verify email not already exist/duplicated
-  Verify valid password is provided
-  Verify  terms and conditions are accepted
-  Verify  user details are not provided
-  Verify optional emails selection
-  Verify phone number required
-  Verify  valid company name provided
-  Verify company name not already exist
-  Verify  email is valid and not valid
-  Verify  password is not too short
-  Verify password contains a number
-  Verify  password does contain a special character
-  Verify  password does contain an uppercase and lowercase
-  Verify  when phone number is in invalid format
-  Verify phone number not empty
-  Verify phone number does not accept letters
-  Verify phone number is too short
-  Verify  phone number is too long
-  Verify first and last provided
-  Verify  first and last name does not contains numbers
-  Verify  first and last name does not contains special characters
-  Verify  company name contains does special characters
-  Verify terms and conditions are displayed and clickable
-  Verify error messages are displayed where needed

<br>

<br>

2. TEST CASES - TEXT LIMIT VALIDATION
<br>
- Verify suggestions must not displayed when the character count exceeds 100.
- Verify suggestions relate to the related search term
- Verify suggestions must display when the character count is 100 or less.
- Verify CTA button is disabled when the character count exceeds 1000  
- Verify suggestions return normal when the character count is reduced to 100 or less
- Verify CTA button is disabled when count is 0 
- Verify CTA button is enabled when the character count is below 1000
- Verify CTA button is enabled when when the character count is below 1000
- Verify counter visibility when 500 Characters
- Verify counter not visibility before 500 Characters
- Verify after the error message is displayed anymore
- Verify a specific error message is displayed when the character count exceeds the 1000 limit
- Verify the counter becomes visible when the text in the "purpose" field reaches 500 characters
- Verify that the counter is visible and displays the correct number of characters 
- Verify the counter is not visible when the text is less than 500 characters
- Verify the counter is visible and displays the current number of characters when the field has more than 1000 characters.
- Verify the "purpose" field remains editable even when the character count exceeds 1000.
- Verify no error message is displayed when the field is empty
- Verify the characters exceed count highted
- Verify the field goes to the "error state" (red border) when the character count exceeds 1000.
- Verify the CTA button is disabled when the character count exceeds 1000.
- Verify the field returns to its normal style (no error state) when the character count is reduced to 1000 or less.
- Verify the field returns to its normal style when the field is empty.
- Verify that the "purpose" field is scrollable when the text content exceeds the visible area.
Verify that the "purpose" field is scrollable when the text content exceeds the visible area also in the error state
- Verify the copy and paste within the text field is working correctly and possible.

<br>

<br>


3. TEST CASES - STRONG PASSWORD VALIDATION

<br>

- Verify the new password with fewer than 8 characters is not accepted.
- Verify the new password with exactly 8 characters is accepted
- Verify the new password with more than 8 characters 
- Verify the new password without any numerical characters is not allowed
- Verify placeholders "Enter current password" displayed on Current password field
- Verify placeholders "Enter new password" displayed on New password field
- Verify passwords are hidden/hashed when entered.
- Verify passwords are visible when "view password" icon clicked.
- Verify passwords are not visible when "view password" icon clicked.
- Verify a new password not meeting all criteria (min 8 characters, at least one number, at least one letter) is rejected
- Verify a new password with one or more numbers is accepted
- Verify a new password with one or more letters is accepted
- Verify the new password without any special characters is not allowed
- Verify the new password without any uppercase letters is not allowed
- Verify the new password without any lowercase letters is not allowed
- Verify password in error state (in red) when wrong after CTA "Save" button is clicked
- Verify the new password meeting all criteria (min 8 characters, at least one number, at least one letter) is accepted.
- Verify the CTA "Save" button remains disabled if the old password field is empty, even if the new password meets the criteria.
- Verify the CTA "Save" button remains disabled if the new password field is empty, even if the old password meets the criteria
- Verify the CTA "Save" button is disabled when the screen is first loaded
- Verify the CTA "Save" button is enabled only when both the old password field is filled and the new password meets all criteria
- Verify the CTA "Save" button is disabled when the old password field is empty, even if the new password is valid.
- Verify the CTA "Save" button is disabled when the new password field is empty, even if the old password is valid.
- Verify validation of the old password is only triggered after the user clicks the "Save" button.
- Verify no error message is displayed when a correct old password is provided
- Verify an error message is displayed when an incorrect old password is provided clicks the "Save" button.
- Verify success message displayed when a correct old password and a valid new password are provided and saved.
- Verify user is navigated to "Account/Settings" page after successful password change. 
- Verify the error message is clear and visible to user after "Save" button is clicked.
- Verify the error message is has understandable /readable
- Verify error message when criteria not met is correct (i.e least 1 number)
- Verify user can login with new password when signing in.
- Verify old password cannot login / not accepted
