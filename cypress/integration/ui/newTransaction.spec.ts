import { TransactionPage } from "../../support/ObjectPages/transaction";

describe('new transaction',()=>{
    const username='Khanh'
    beforeEach(()=>{
        cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${username}`+"'")
        .then(function(returnObject) {
            const results = returnObject[0]
            cy.intercept('/signin').as('signin');
            cy.login(results.username,results.password);
            let transaction = new TransactionPage();
            transaction.clickNewTransaction();
            cy.location("pathname").should("eq", "/transaction/new");
            //search user need to transaction
            transaction.searchUserToTransaction("Dung");
            //Selet user
            transaction.selectUserToTransaction("Dung")
            cy.xpath('//h2[contains(@class,"MuiTypography-gutterBottom")]').should("be.text","Dung Le");
        })
        
      })
    afterEach(()=>{
        cy.logout();
        cy.wait('@signin');
    })
    it('create transaction-Pay',()=>{
        let transaction = new TransactionPage();
        //amount input
        transaction.typeAmountInput('123');
        //description input
        transaction.typeDescriptionInput('breakfast')
        //
        transaction.clickSubmitPay();
        transaction.submitExpect("Paid")
        cy.Snapshot('Paid success');

    });
    it('create transaction-Requested',()=>{
        let transaction = new TransactionPage();
        //amount input
        transaction.typeAmountInput('123');
        //description input
        transaction.typeDescriptionInput('breakfast')
        //
        transaction.clickSubmitRequest();
        transaction.submitExpect("Requested")
        cy.Snapshot('Requested success');
    })
    it('create transaction display error',()=>{
        let transaction = new TransactionPage();
        //amount input
        transaction.element.amountInput().type('123').find("input").clear().blur();
        transaction.element.amountHelperText().should('be.visible');
        //description input
        transaction.element.descriptionInput().type('abc').find("input").clear().blur();
        transaction.element.descriptionHelperText().should("be.visible");
        //
        transaction.element.submitPay().should("be.disabled");
        transaction.element.submitRequest().should("be.disabled");
        cy.Snapshot();
    })


})