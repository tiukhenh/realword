import { Given , Then , When} from "@badeball/cypress-cucumber-preprocessor";
import { TransactionPage } from "../../support/ObjectPages/transaction";
import { NotificationPage } from "../../support/ObjectPages/notification";
const transaction = new TransactionPage();
const notification= new NotificationPage();
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
When ('A user lick notification icon',()=>{
    notification.clickNotificationIcon();
})
Then ('Verify first item in notification list contain {string},{string}',(name,message)=>{
    notification.checkFirstItemInNotificationList(name,message);    
})