Feature: authen

    Background: Authencation
        Given A user open signup page
    Scenario: Signup, Login and create bank account and logout
        When A user enter FirstName 'Khanh'
        And A user enter LastName 'Tu'
        And A user enter UserName 'KhanhTu'
        And A user enter Password 'Khanh@123'
        And A user enter ConfirmPassword 'Khanh@123'
        And A user click signup button
        Then Verify login page will be display
        When A user enter userName login 'KhanhTu'     
        And A user enter Password login 'Khanh@123'
        And A user click login button
        Then Verify Get Started with Real World App message will be display
        When A user click next to navigate create bankaccount form
        Then Verify create bank account form will be display
        When A user enter bankName 'The Best Bank'
        And A user enter routingNumber '987654321'
        And A user enter accountNumber '123456789'
        And A user click submit bankaccount form
        Then Verify finish notice will be display
        When A user click next to navigate transaction list
        Then Verify transaction list will be display
        When A user click logout to logout
        Then Verify signin page will be display
    Scenario: Login error
        Given A user open login page
        When A user enter userName login 'khanh' and clear it
        Then Verify error message Username is required of login form should be display
        When A user enter Password login 'Khanh@123' and clear it
        Then Verify error message Password must contain at least 4 characters should be display
        And Verify signin button is disabled
    Scenario: Login with user is invalid
        When Login with user is invalid
        Then Verify error message Username or password is invalid should be display
    Scenario: Signup errors
        When A user enter FirstName 'Khanh' and clear it
        Then Verify error message First Name is required should be display
        And A user enter LastName 'Ong' and clear it
        Then Verify error message Last Name is required should be display
        And A user enter UserName 'KhanhTuOng' and clear it
        Then Verify error message Username is required of signup form should be display
        And A user enter Password 'Khanh@123' and clear it
        Then Verify error message Enter your password should be display
        And A user enter ConfirmPassword 'Khanh@123' and clear it
        Then Verify error message Password does not match should be display
        And Verify signup button is disabled


    