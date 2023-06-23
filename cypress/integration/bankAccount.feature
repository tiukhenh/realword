
Feature: Create bank account

    Background: Login
        Given A user open signin page
        When User successfully logged in
        |username|password |
        |KhanhOng|Khanh@123|
        And A User click bank account
    Scenario: Create bank account
        When A user click icon add bank account
        Then Verify Create bank account form should be display
        When A user enter bank name 'The Best Bank'
        When A user enter routing number '987654321'
        When A use enter account number '123456789'
        When A user click save button to add bank account
        Then Verify new bank account 'The Best Bank' is create

    Scenario: Display bank account form errors
        When A user click icon add bank account
        Then Verify Create bank account form should be display
        
        When A user enter bank name 'The' and clear it
        Then Verify error message bankname 'Enter a bank name' should be display
        When A user enter bank name 'The'
        Then Verify error message bankname 'Must contain at least 5 characters' should be display
        
        When A user enter routing number and clear it
        Then Verify error message routingnumber 'Enter a valid bank routing number' should be display
        When A user enter routing number '12345678'
        Then Verify error message routingnumber 'Must contain a valid routing number' should be display
        When A user enter routing number '123456789'
        Then Then Verify no exit routingnumber

        When A use enter account number and clear it
        Then Verify error message accountnumber 'Enter a valid bank account number' should be display
        When A use enter account number '12345678'
        Then Verify error message accountnumber 'Must contain at least 9 digits' should be display
        When A use enter account number '123456789'
        Then Verify no exit accountnumber
        When A use enter account number '12345678911'
        Then Verify no exit accountnumber
        When A use enter account number '1234567891111'
        Then Verify error message accountnumber 'Must contain no more than 12 digits' should be display

        Then Verify save button to add bank account is disabled