Feature: User setting

    Background: Login
        Given A user open signin page
        When User successfully logged in
        |username|password |
        |KhanhOng|Khanh@123|
        And A User click My account
        Then Verify user setting form should be display
    
    Scenario: Display user setting form error
        When A User enter firstName input and clear it
        Then Verify error message Enter a first name should be display
        When A User enter lastName input and clear it
        Then Verify error message Enter a last name should be display
        When A User enter email input 'abc' and clear it
        Then Verify error message emailInput 'Enter an email address' should be display
        When A User enter email input 'abc'
        Then Verify error message emailInput 'Must contain a valid email address' should be display
        When A User enter phone input '098' and clear it
        Then Verify error message phoneInput 'Enter a phone number' should be display
        When A User enter phone input '098'
        Then Verify error message phoneInput 'Phone number is not valid' should be display
        And Verify save button in User setting form is 'disabled'
    Scenario: Update first name, last name, email and phone number
        When A User enter firstName input 'New First Name'
        When A User enter lastName input 'New Last Name'
        When A User enter email input 'email@email.com'
        When A User enter phone input '0987653589'
        Then Verify save button in User setting form is 'not disabled'
        When A user click save User setting form
        Then Verify setting user successfully 'New First Name'
    Scenario Outline: Logout
        When A user click Logout