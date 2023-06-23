
import { TransactionPage } from "../../support/ObjectPages/transaction";


describe('Transaction view',()=>{
    const username='Khanh'
    beforeEach(()=>{
        cy.intercept('/signin').as('signin');
        cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${username}`+"'")
        .then(function(returnObject) {
            const results = returnObject[0]
            cy.login(results.username,results.password);
        })
        let transaction= new TransactionPage();
        transaction.selectTransactionFirst();     
      })
    afterEach(()=>{
        cy.logout();
        cy.wait('@signin');
    })
    it('Transaction detail should be displays',()=>{   
        let transaction= new TransactionPage();  
        transaction.checkShowDetailTransaction();
        cy.Snapshot();
    })
    it("likes a transaction",()=> {
        let transaction= new TransactionPage(); 
        transaction.clickButtonLike();
        transaction.checkCountLike();
        transaction.checkButtonLikeDisabled();
        cy.Snapshot();
    });
    it("comments on a transaction",()=> {
        let transaction= new TransactionPage();
        const comments = ["Thank you!", "Appreciate it."];
        comments.forEach((comment,index)=>{
            transaction.commentInput(comment);
            // cy.getBySelLike("comment-input").type(`${comment}{enter}`);
            transaction.commentList(comment,index);
            // cy.getBySel("comments-list").children().eq(index).contains(comment);
        })  
        transaction.element.commentList().children().should("have.length", comments.length);
        cy.Snapshot();
    });
    // it.only('accepts a transaction request',()=>{
    //     cy.getBySel('nav-personal-tab').click();
    //     cy.get("body").scrollIntoView({ top: 'start', behavior: 'smooth' });
        
    //     // cy.getBySelLike('transaction-receiver').contains("New First Name").scrollIntoView({ top: 'start', behavior: 'smooth' }).click();
    //     //.and(cy.getBySelLike('transaction-action').contains('requested '))
    //     cy.get("body").scrollIntoView({ top: 'start', behavior: 'smooth' });
    //     cy.getBySelLike('transaction-accept-request').click();
    //     cy.getBySelLike('transaction-action').should('be.text',' charged');
    // })
})