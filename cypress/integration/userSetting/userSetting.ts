import { Given , Then , When} from "@badeball/cypress-cucumber-preprocessor";
import { UserPage } from "../../support/ObjectPages/usersetting";
// import { SignupPage } from "../../support/ObjectPages/signup";
const user = new UserPage();
//login
Given ('A user open signin page',()=>{
    cy.visit('/signin');
})
When ('User successfully logged in {string},{string}',(userName, password)=>{
    cy.login(userName,password);
})
// navagate user setting form
When ('A User click My account',()=>{
    user.clickUserSettingLocation();
    
})
Then ('Verify user setting form should be display',()=>{
    user.checkUserSettingForm();
})
//logout
When('A user click Logout',()=>{
    cy.logout();
})
//Display user setting form error
When ('A User enter firstName input and clear it',()=>{
    user.element.firstNameInput().clear();
})
Then ('Verify error message Enter a first name should be display',()=>{
    user.element.firstNameHelperText().should("be.visible").and("contain", "Enter a first name");
})
When ('A User enter lastName input and clear it',()=>{
    user.element.lastNameInput().clear();
})
Then ('Verify error message Enter a last name should be display',()=>{
    user.element.lastNameHelperText().should("be.visible").and("contain", "Enter a last name");
})
When ('A User enter email input {string} and clear it',(email)=>{
    user.element.emailInput().type(email).clear();
})
Then ('Verify error message emailInput {string} should be display',(message)=>{
    user.element.emailHelperText().should("be.visible").and("contain", message);
})
When ('A User enter email input {string}',(email)=>{
    user.element.emailInput().clear().type(email);
})
When ('A User enter phone input {string} and clear it',(phone)=>{
    user.element.phoneNumberInput().type(phone).clear();
})
Then ('Verify error message phoneInput {string} should be display',(message)=>{
    user.element.phoneNumberHelperText().should("be.visible").and("contain", message);
})
When ('A User enter phone input {string}',(phone)=>{
    user.element.phoneNumberInput().type(phone);
})
Then ('Verify save button in User setting form is {string}',(type)=>{
    if (type == 'disabled'){
        user.element.savebutton().should("be.disabled");
    } else {
        user.element.savebutton().should("not.be.disabled");
    }
})
When ('A User enter firstName input {string}',(firstName)=>{
    user.element.firstNameInput().clear().type(firstName);
})
When ('A User enter lastName input {string}',(lastName)=>{
    user.element.lastNameInput().clear().type(lastName);
})

When ('A user click save User setting form',()=>{
    user.element.savebutton().click();
})
Then ('Verify setting user successfully {string}',(firstName)=>{
    cy.getBySel("sidenav-user-full-name").should("contain",firstName);
})