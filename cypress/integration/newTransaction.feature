Feature: new transaction

    Background: Login
        Given A user open signin page
        When User successfully logged in
        |username|password |
        |KhanhOng|Khanh@123|
        And A User click new transaction
        Then Verify new transaction should be display
        When A User search User to transaction 'Khanh'
        And A user select usser to transaction 'Khanh'
        Then Verify fullname of the selected user should be display "Khanh Tu"
    Scenario: create transaction-Pay
        When A user enter amount input '123'
        And A user enter description input 'breakfast'
        And A user click submit pay
        Then Verify 'Paid' text should be display
    Scenario: create transaction-Requested
        When A user enter amount input '123'
        And A user enter description input 'breakfast'
        And A user click submit Requested
        Then Verify 'Requested' text should be display
    Scenario: create transaction display error
        When A user enter amount input '123' and clear it
        Then Verify error message amount should be display
        When A user enter description input 'breakfast' and clear it
        Then Verify error message description should be display
        Then Verify submit button Pay and Requested is disable