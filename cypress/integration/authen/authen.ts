import { Given , Then , When} from "@badeball/cypress-cucumber-preprocessor";
import { SignupPage } from "../../support/ObjectPages/signup";

const signup = new SignupPage();

Given ('A user open signup page',()=>{
    // cy.deleteFile('cypress/reports/mochawesome-report/');
    // cy.deleteFile('allure-results/');
    cy.visit('/signup');
})
//signup
When ('A user enter FirstName {string}',(FirstName)=>{
    signup.typeFirstNameInput(FirstName);
})
When ("A user enter LastName {string}",(LastName)=>{
    signup.typeLastNameInput(LastName);
})
When ("A user enter UserName {string}",(UserName)=>{
    signup.typeUsertNameInput(UserName);
})
When ("A user enter Password {string}",(Password)=>{
    signup.typePasswordInput(Password);
})
When ("A user enter ConfirmPassword {string}",(ConfirmPassword)=>{
    signup.typeConfirmPasswordInput(ConfirmPassword);
})
When ("A user click signup button",()=>{
    signup.clickSignup();
})
Then ("Verify login page will be display",()=>{
    cy.location("pathname").should("eq", "/signin");
})
//login
When ('A user enter userName login {string}',(userName)=>{
    cy.get('#username').type(userName);
})
When ('A user enter Password login {string}',(password)=>{
    cy.get('#password').type(password);
})
When ('A user click login button',()=>{
    cy.get('[data-test="signin-submit"]').click();
})
Then("Verify Get Started with Real World App message will be display",()=>{
    cy.get('h2.MuiTypography-h6').should('have.text','Get Started with Real World App');
})
When ("A user click next to navigate create bankaccount form",()=>{
    cy.get('[data-test="user-onboarding-next"]').click();
})
Then ('Verify create bank account form will be display',()=>{
    cy.get('h2.MuiTypography-h6').should('have.text','Create Bank Account');
})
//create bank account
When ("A user enter bankName {string}",(bankName)=>{
    cy.get('[name="bankName"]').type(bankName);
}) 
When ("A user enter routingNumber {string}",(routingNumber)=>{
    cy.get('[name="routingNumber"]').type(routingNumber);
}) 
When ("A user enter accountNumber {string}",(accountNumber)=>{
    cy.get('[name="accountNumber"]').type(accountNumber);
}) 
When ("A user click submit bankaccount form",()=>{
    cy.get('[type="submit"]').click();
}) 
Then ("Verify finish notice will be display",()=>{
    cy.get('[data-test="user-onboarding-dialog-title"]').should("contain", "Finished");
}) 
When ("A user click next to navigate transaction list",()=>{
    cy.get('[data-test="user-onboarding-next"]').click();
}) 
Then ("Verify transaction list will be display",()=>{
    cy.get('[data-test="transaction-list"]').should("be.visible");
})
When ("A user click logout to logout",()=>{
    cy.getBySel('sidenav-signout').click();
})
Then ("Verify signin page will be display",()=>{
    cy.location("pathname").should("eq", "/signin");
})
//Login error
Given ('A user open login page',()=>{
    cy.visit('/signin');
})
When ('A user enter userName login {string} and clear it',(userName)=>{
    cy.getBySel("signin-username").type("User").find("input").clear().blur();
})
Then ('Verify error message Username is required of login form should be display',()=>{
    cy.get("#username-helper-text").should("be.visible").and("contain", "Username is required");
})
When ('A user enter Password login {string} and clear it',(password)=>{
    cy.getBySel("signin-password").type("abc").find("input").blur();
})
Then ('Verify error message Password must contain at least 4 characters should be display',()=>{
    cy.get("#password-helper-text").should("be.visible").and("contain", "Password must contain at least 4 characters");
})
Then ('Verify signin button is disabled',()=>{
    cy.getBySel("signin-submit").should("be.disabled");
})
//Login with user is invalid

When ('Login with user is invalid',()=>{
    cy.login("hgkifd","98767123");
})
Then ('Verify error message Username or password is invalid should be display',()=>{
    cy.getBySel("signin-error").should('be.visible').and("contain","Username or password is invalid");
})
//signup error
When ('A user enter FirstName {string} and clear it',()=>{
    signup.element.firstNameinput().type('First').clear().blur();
})
Then ('Verify error message First Name is required should be display',()=>{
    signup.element.errorfirstName().should("be.visible").and("contain", "First Name is required");
})
When ('A user enter LastName {string} and clear it',()=>{
    signup.element.lastNameinput().type('Last').clear().blur();
})
Then ('Verify error message Last Name is required should be display',()=>{
    signup.element.errorlastName().should("be.visible").and("contain", "Last Name is required");
})
When ('A user enter UserName {string} and clear it',()=>{
    signup.element.usernameinput().type('User').clear().blur();
})
Then ('Verify error message Username is required of signup form should be display',()=>{
    signup.element.errorusername().should("be.visible").and("contain", "Username is required");
})
When ('A user enter Password {string} and clear it',()=>{
    signup.element.passwordinput().type('password').clear().blur();
})
Then ('Verify error message Enter your password should be display',()=>{
    signup.element.errorpassword().should("be.visible").and("contain", "Enter your password");
})
When ('A user enter ConfirmPassword {string} and clear it',()=>{
    signup.element.confirmPasswordinput().type('DIFFERENT PASSWORD').blur();
})
Then ('Verify error message Password does not match should be display',()=>{
    signup.element.errorconfirmPassword().should("be.visible").and("contain", "Password does not match");
})
Then ('Verify signup button is disabled',()=>{
    signup.element.signupButton().should("be.disabled");
})







