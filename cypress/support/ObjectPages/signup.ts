
class SignupPage {
    element = {
        firstNameinput: () => cy.get('#firstName'),
        lastNameinput: () => cy.get('#lastName'),
        usernameinput: () => cy.get('#username'),
        passwordinput: ()=> cy.get('#password'),
        confirmPasswordinput: ()=> cy.get('#confirmPassword'),
        signupButton: () => cy.get(`[data-test=signup-submit]`),

        errorfirstName:()=> cy.get("#firstName-helper-text"),
        errorlastName:()=> cy.get("#lastName-helper-text"),
        errorusername:()=> cy.get("#username-helper-text"),
        errorpassword:()=> cy.get("#password-helper-text"),
        errorconfirmPassword:()=> cy.get("#confirmPassword-helper-text")
    }
    typeFirstNameInput(firstName:string){
        this.element.firstNameinput().type(firstName);
    }
    typeLastNameInput(lastName:string){
        this.element.lastNameinput().type(lastName);
    }
    typeUsertNameInput(username:string){
        this.element.usernameinput().type(username);
    }
    typePasswordInput(password:string){
        this.element.passwordinput().type(password);
    }
    typeConfirmPasswordInput(password:string){
        this.element.confirmPasswordinput().type(password);
    }
    clickSignup() {       
        this.element.signupButton().click();             
    }
}

export {SignupPage};