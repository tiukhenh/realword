import { UserPage } from "../../support/ObjectPages/usersetting";

describe('User Setting',()=>{
    const username='Khanh'
    beforeEach(()=>{
        // cy.intercept("GET", "/bankaccounts").as("bankaccounts");
        cy.intercept('/signin').as('signin');
        cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${username}`+"'")
        .then(function(returnObject) {
            const results = returnObject[0]
            cy.login(results.username,results.password);
        })
        let user = new UserPage();
        user.clickUserSettingLocation();
        user.checkUserSettingForm();
      })
    afterEach(()=>{
        cy.logout();
        cy.wait('@signin');
    })
    it.only("user setting form should display",()=>{
        cy.Snapshot();
    });
    it("should display user setting form errors",()=>{
        let user = new UserPage();
        //first name
        user.element.firstNameInput().clear();
        user.element.firstNameHelperText().should("be.visible").and("contain", "Enter a first name");
        //last name
        user.element.lastNameInput().clear();
        user.element.lastNameHelperText().should("be.visible").and("contain", "Enter a last name");
        //email
        user.element.emailInput().type("abc").clear();
        user.element.emailHelperText().should("be.visible").and("contain", "Enter an email address");

        user.element.emailInput().type("abc");
        user.element.emailHelperText().should("be.visible").and("contain", "Must contain a valid email address");
        //phone
        user.element.phoneNumberInput().type("abc").clear();
        user.element.phoneNumberHelperText().should("be.visible").and("contain", "Enter a phone number");

        user.element.phoneNumberInput().type("098");
        user.element.phoneNumberHelperText().should("be.visible").and("contain", "Phone number is not valid");

        user.element.savebutton().should("be.disabled");
        cy.Snapshot();
    });
    it.only("Update first name, last name, email and phone number",()=>{
        //use data in database to update infomation
        cy.task('queryDb',"select * from cypress_realword.user")
			.then(function(returnObject) {
				//expect(result);
				const results = returnObject[0]
                let user = new UserPage();
                user.element.firstNameInput().clear().type(results.firstName);
                user.element.lastNameInput().clear().type(results.lastName);
                user.element.emailInput().clear().type(results.email);
                user.element.phoneNumberInput().clear().type(results.phoneNumber);
                user.element.savebutton().should("not.be.disabled");
                user.element.savebutton().click();
                cy.getBySel("sidenav-user-full-name").should("contain",results.firstName);
                cy.Snapshot();
	    }); 
        
    })

})