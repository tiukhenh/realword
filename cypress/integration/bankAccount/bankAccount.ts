import { Given , Then , When} from "@badeball/cypress-cucumber-preprocessor";
import { BankAccountPage } from "../../support/ObjectPages/bankAccount";

const bankaccount= new BankAccountPage();
//login
Given ('A user open signin page',()=>{
    cy.visit('/signin');
})
When ('User successfully logged in',(table)=>{
    table.hashes().forEach(row => {
        cy.login(row.username,row.password);
    });
})
// navagate user setting form
When ('A User click bank account',()=>{
    bankaccount.element.BankAccountLoca().click();
})
When ('A user click icon add bank account',()=>{
    bankaccount.element.iconAddBankAccount().click();
})
Then ('Verify Create bank account form should be display',()=>{
    cy.location("pathname").should("eq", "/bankaccounts/new");
})
When ('A user enter bank name {string}',(bankName)=>{
    bankaccount.typeBankName(bankName);
})
When ('A user enter routing number {string}',(routingNumber)=>{
    bankaccount.typeRoutingNumber(routingNumber);
})
When ('A use enter account number {string}',(accountNumber)=>{
    bankaccount.typeAccountNumber(accountNumber)
})
When ('A user click save button to add bank account',()=>{
    bankaccount.clickAddSubmit();
})
Then ('Verify new bank account {string} is create',(bankName)=>{
    cy.getBySel("bankaccount-list").should("be.visible").find('li').eq(1).should("contain", bankName);;
})

When ('A user enter bank name {string} and clear it',(name)=>{
    bankaccount.element.addBankName().type(name).clear().blur();
})
Then ('Verify error message bankname {string} should be display',(message)=>{
    bankaccount.element.bankNameHelperText().should("be.visible").and("contain", message);
})
When ('A user enter routing number and clear it',()=>{
    bankaccount.element.addRoutingNumber().focus().blur();
})
Then ('Verify error message routingnumber {string} should be display',(message)=>{
    bankaccount.element.routingNumberHelperText().should("be.visible").and("contain", message);
})

Then ('Then Verify no exit routingnumber',()=>{
    bankaccount.element.routingNumberHelperText().should("not.exist");
})

When ('A use enter account number and clear it',()=>{
    bankaccount.element.addAccountNumber().focus().blur();
})
Then ('Verify error message accountnumber {string} should be display',(message)=>{
    bankaccount.element.accountNumberHelperText().should("be.visible").and("contain", message);
})
Then('Verify no exit accountnumber',()=>{
    bankaccount.element.accountNumberHelperText().should("not.exist");
})

Then ('Verify save button to add bank account is disabled',()=>{
    bankaccount.element.addSubmit().should("be.disabled");
})
