Feature: Transaction view

       Background: Login
            Given A user open signin page
            When User successfully logged in
            |username|password |
            |KhanhOng|Khanh@123|
            And A User click to select transaction
            Then Verify detail of transaction should be display
        Scenario: Like a transaction
            When  A user click like button 
            Then Verify count variable is added
            Then Verify like button is disable
        Scenario: commet on a transaction
            When A user enter a commet "Thanks"
            Then Verify this comment "Thanks" should be display in comment list
        
   