Feature: Notification

    Background: Login
        Given A user open signin page
    Scenario: User A pay user B    
        When User successfully logged in
        |username|password |
        |KhanhOng|Khanh@123|
        And A User click new transaction
        Then Verify new transaction should be display
        When A User search User to transaction 'Khanh'
        And A user select usser to transaction 'Khanh'
        Then Verify fullname of the selected user should be display "Khanh Tu"
        When A user enter amount input '123'
        And A user enter description input 'breakfast'
        And A user click submit pay
        Then Verify 'Paid' text should be display

        When User successfully logged in 'Khanh','Khanh@123'
        And A user lick notification icon
        Then Verify first item in notification list contain 'Khanh','received payment'
    Scenario: User A request user B
         When User successfully logged in 'KhanhOng','Khanh@123'
        And A User click new transaction
        Then Verify new transaction should be display
        When A User search User to transaction 'Khanh'
        And A user select usser to transaction 'Khanh'
        Then Verify fullname of the selected user should be display "Khanh Tu"
        When A user enter amount input '123'
        And A user enter description input 'breakfast'
        And A user click submit Requested
        Then Verify 'Requested' text should be display

        When User successfully logged in 'Khanh','Khanh@123'
        And A user lick notification icon
        Then Verify first item in notification list contain 'Khanh','requested payment'