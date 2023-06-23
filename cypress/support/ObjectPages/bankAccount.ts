class BankAccountPage {
    element = {
        BankAccountLoca:()=>cy.getBySel('sidenav-bankaccounts'),
        iconAddBankAccount:()=>cy.getBySel('bankaccount-new'),
        addBankName:()=>cy.get('[name="bankName"]'),
        addRoutingNumber:()=>cy.get('[name="routingNumber"]'),
        addAccountNumber:()=>cy.get('[name="accountNumber"]'),
        addSubmit:()=>cy.get('[type="submit"]'),

        bankNameHelperText:()=>cy.get("#bankaccount-bankName-input-helper-text"),
        routingNumberHelperText:()=>cy.get('#bankaccount-routingNumber-input-helper-text'),
        accountNumberHelperText:()=>cy.get('#bankaccount-accountNumber-input-helper-text')
    }
    typeBankName(bankName:string){
        this.element.addBankName().clear().type(bankName);
    }
    typeRoutingNumber(routingNumber:string){
        this.element.addRoutingNumber().clear().type(routingNumber);
    }
    typeAccountNumber(accountNumber:string){
        this.element.addAccountNumber().clear().type(accountNumber);
    }
    clickAddSubmit(){
        this.element.addSubmit().click();
    }
}

export {BankAccountPage};