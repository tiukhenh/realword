import { TransactionPage } from "../../support/ObjectPages/transaction";
import { NotificationPage } from "../../support/ObjectPages/notification";

describe('Notification',()=>{
    const userA='Khanh'
    const userB='Dung'
    beforeEach(()=>{
        cy.intercept('/signin').as('signin');
        
       
      })
    afterEach(()=>{
        cy.logout();
        cy.wait('@signin');
    })
    it('user A pay user B',()=>{
        cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${userA}`+"'")
        .then(function(returnObject) {
            const results = returnObject[0]
            //user A login
            cy.login(results.username,results.password);
            let transaction = new TransactionPage();
            transaction.clickNewTransaction();
            cy.location("pathname").should("eq", "/transaction/new");
            //search user need to transaction
            cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${userB}`+"'")
            .then(function(returnObject) {
                const results_b = returnObject[0]
                transaction.searchUserToTransaction(results_b.username);
                //Selet user
                transaction.selectUserToTransaction(results_b.username)
                cy.xpath('//h2[contains(@class,"MuiTypography-gutterBottom")]').should("be.text",results_b.firstName+" "+results_b.lastName);
                
            })
            //amount input
            transaction.typeAmountInput('123');
            //description input
            transaction.typeDescriptionInput('breakfast')
            //
            transaction.clickSubmitPay();
            transaction.submitExpect("Paid");
            cy.Snapshot('user A')

            cy.logout();
            cy.wait('@signin');
        })
        cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${userB}`+"'")
        .then(function(returnObject) {
            const results = returnObject[0]
            //user B login
            cy.login(results.username,results.password);
            let notification= new NotificationPage();
            notification.clickNotificationIcon();
            notification.checkFirstItemInNotificationList(results.username, "received payment");
            cy.Snapshot('user B')
        })
         
    });
    it('user A Request user B',()=>{
        cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${userA}`+"'")
        .then(function(returnObject) {
            const results_a = returnObject[0]
            //user A login
            cy.login(results_a.username,results_a.password);
            let transaction = new TransactionPage();
            transaction.clickNewTransaction();
            cy.location("pathname").should("eq", "/transaction/new");
            //search user need to transaction
            cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${userB}`+"'")
            .then(function(returnObject) {
                const results_b = returnObject[0]
                transaction.searchUserToTransaction(results_b.username);
                //Selet user
                transaction.selectUserToTransaction(results_b.username)
                cy.xpath('//h2[contains(@class,"MuiTypography-gutterBottom")]').should("be.text",results_b.firstName+" "+results_b.lastName);
                //amount input
                transaction.typeAmountInput('123');
                //description input
                transaction.typeDescriptionInput('breakfast')
                //
                transaction.clickSubmitRequest();
                transaction.submitExpect("Requested");
                cy.Snapshot('user A')

                cy.logout();
                cy.wait('@signin');

                cy.login(results_b.username,results_b.password);
                let notification= new NotificationPage();
                notification.clickNotificationIcon();
                notification.checkFirstItemInNotificationList(results_a.username, "requested payment");
                cy.Snapshot('user B')
            })
            
        })
         
    }); 
    it('user A like transaction, user B get notification that user A like ',()=>{
        cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${userA}`+"'")
        .then(function(returnObject) {
            const results_a = returnObject[0]
            //user A login
            cy.login(results_a.username,results_a.password);
            cy.getBySel('nav-personal-tab').click();

            let transaction= new TransactionPage(); 
            transaction.selectTransactionFirst();  

            transaction.clickButtonLike();
            transaction.checkCountLike();
            transaction.checkButtonLikeDisabled();
            cy.Snapshot('user A')

            cy.logout();
            cy.wait('@signin');
            //user B login
            cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${userB}`+"'")
            .then(function(returnObject) {
                const results_b = returnObject[0]
                cy.login(results_b.username,results_b.password);
                let notification= new NotificationPage();
                notification.clickNotificationIcon();
                notification.checkFirstItemInNotificationList(results_a.username, "liked a transaction");  
                // cy.getBySelLike("notification-list-item").first().should("contain", 'Khanh').and("contain", "liked a transaction");    
                cy.Snapshot('user B')
            })
            
        })
        
    });
    it('user A comment transaction, user B get notification that user A comment ',()=>{
        cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${userA}`+"'")
        .then(function(returnObject) {
            const results_a = returnObject[0]
            //user A login
            cy.login(results_a.username,results_a.password);
            cy.getBySel('nav-personal-tab').click();

            let transaction= new TransactionPage(); 
            transaction.selectTransactionFirst();  
            
            transaction.commentInput('Thanks');
            transaction.commentList('Thanks',0);
            cy.Snapshot('user A')

            cy.logout();
            cy.wait('@signin');
            //user B login
            cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${userB}`+"'")
            .then(function(returnObject) {
                const results_b = returnObject[0]
                cy.login(results_b.username,results_b.password);
                let notification= new NotificationPage();
                notification.clickNotificationIcon();
                notification.checkFirstItemInNotificationList(results_a.username, "commented on a transaction."); 
                       
                cy.Snapshot('user B')
            })
            
        })
    });
})