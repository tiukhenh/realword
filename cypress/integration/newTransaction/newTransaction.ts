import { Given , Then , When} from "@badeball/cypress-cucumber-preprocessor";
import { TransactionPage } from "../../support/ObjectPages/transaction";
const transaction = new TransactionPage();
Given ('A user open signin page',()=>{
    cy.visit('/signin');
})
When ('User successfully logged in',(table)=>{
    table.hashes().forEach(row => {
        cy.login(row.username,row.password);
    });
})
When ('A User click new transaction',()=>{
    transaction.clickNewTransaction();
})
Then ('Verify new transaction should be display',()=>{
    cy.location("pathname").should("eq", "/transaction/new");
})
When ('A User search User to transaction {string}',(name)=>{
    transaction.searchUserToTransaction(name);
})
When ('A user select usser to transaction {string}',(name)=>{
    transaction.selectUserToTransaction(name)
})
Then ('Verify fullname of the selected user should be display {string}',(fullName)=>{
    cy.xpath('//h2[contains(@class,"MuiTypography-gutterBottom")]').should("be.text",fullName);
})
When ('A user enter amount input {string}',(amount)=>{
    transaction.typeAmountInput(amount);
})
When ('A user enter description input {string}',(description)=>{
    transaction.typeDescriptionInput(description)
})
When ('A user click submit pay',()=>{
    transaction.clickSubmitPay();
})
Then ('Verify {string} text should be display',(message)=>{
    transaction.submitExpect(message)
})
When('A user click submit Requested',()=>{
    transaction.clickSubmitRequest();
})

When ('A user enter amount input {string} and clear it',(amount)=>{
    transaction.element.amountInput().type(amount).find("input").clear().blur();
})
Then ('Verify error message amount should be display',()=>{
    transaction.element.amountHelperText().should('be.visible');
})
When ('A user enter description input {string} and clear it',(description)=>{
    transaction.element.descriptionInput().type(description).find("input").clear().blur();
})
Then ('Verify error message description should be display',()=>{
    transaction.element.descriptionHelperText().should("be.visible");
})
Then ('Verify submit button Pay and Requested is disable',()=>{
    transaction.element.submitPay().should("be.disabled");
    transaction.element.submitRequest().should("be.disabled");
})