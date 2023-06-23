import { BankAccountPage } from "../../support/ObjectPages/bankAccount";

describe('Bank Accounts', () => {
  const username='Khanh'
  beforeEach(()=>{
    cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${username}`+"'")
    .then(function(returnObject) {
      const results = returnObject[0]
      cy.intercept("GET", "/bankaccounts").as("bankaccounts");
      cy.intercept('/signin').as('signin');
      cy.login(results.username,results.password);
      let bankaccount= new BankAccountPage();
      bankaccount.element.BankAccountLoca().click();
    })
    
  })
  afterEach(()=>{
    cy.logout();
    cy.wait('@signin');
  })
  it("creates a new bank account", function () {
    let bankaccount= new BankAccountPage();
    bankaccount.element.iconAddBankAccount().click();

    cy.location("pathname").should("eq", "/bankaccounts/new");

    //create bank acc
    bankaccount.typeBankName("The Best Bank");
    bankaccount.typeRoutingNumber("987654321");
    bankaccount.typeAccountNumber("123456789")
    cy.Snapshot("type bank account form");
    // cy.log(cy.state("runnable").fullTitle());// Bank Accounts creates a new bank account
    bankaccount.clickAddSubmit();

    cy.getBySel("bankaccount-list").should("be.visible").find('li').eq(1).should("contain", "The Best Bank");;
    cy.Snapshot("successfully");
  });
  it("should display bank account form errors", function () {
    let bankaccount= new BankAccountPage();
    bankaccount.element.iconAddBankAccount().click();
    //bank name
    bankaccount.element.addBankName().type("The").clear().blur();
    bankaccount.element.bankNameHelperText().should("be.visible").and("contain", "Enter a bank name");

    bankaccount.element.addBankName().type("The").blur();
    bankaccount.element.bankNameHelperText().should("be.visible").and("contain", "Must contain at least 5 characters");

    //Routing number 
    bankaccount.element.addRoutingNumber().focus().blur();
    bankaccount.element.routingNumberHelperText().should("be.visible").and("contain", "Enter a valid bank routing number");

    bankaccount.element.addRoutingNumber().type("12345678").blur();
    bankaccount.element.routingNumberHelperText().should("be.visible").and("contain", "Must contain a valid routing number");
   
    bankaccount.element.addRoutingNumber().clear();

    bankaccount.element.addRoutingNumber().type("123456789").blur();
    bankaccount.element.routingNumberHelperText().should("not.exist");

    // Account number
    bankaccount.element.addAccountNumber().focus().blur();
    bankaccount.element.accountNumberHelperText().should("be.visible").and("contain", "Enter a valid bank account number");
      //min 9 digits
    bankaccount.element.addAccountNumber().type("12345678").blur();
    bankaccount.element.accountNumberHelperText().should("be.visible").and("contain", "Must contain at least 9 digits");

    bankaccount.element.addAccountNumber().clear();
      // form 9 to 12 digits
    bankaccount.element.addAccountNumber().type("123456789").blur();
    bankaccount.element.accountNumberHelperText().should("not.exist");

    bankaccount.element.addAccountNumber().clear();

    bankaccount.element.addAccountNumber().type("123456789111").blur();
    bankaccount.element.accountNumberHelperText().should("not.exist");

    bankaccount.element.addAccountNumber().clear();
      //min 9 digits
    bankaccount.element.addAccountNumber().type("1234567891111").blur();
    bankaccount.element.accountNumberHelperText().should("be.visible").and("contain", "Must contain no more than 12 digits");

    bankaccount.element.addSubmit().should("be.disabled");
    cy.Snapshot();

  });
  
  it("Deletes a bank account",()=> {
    cy.getBySel("bankaccount-delete").first().click();
    cy.getBySel("bankaccount-list").children().contains("Deleted");
    cy.Snapshot();

  });


})