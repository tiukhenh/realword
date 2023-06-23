class UserPage {
    element = {
        userSettingLoca:()=>cy.getBySel("sidenav-user-settings"),
        userSettingForm:()=>cy.getBySel("user-settings-form"),
        firstNameInput:()=>cy.getBySel("user-settings-firstName-input"),
        lastNameInput:()=>cy.getBySel("user-settings-lastName-input"),
        emailInput:()=>cy.getBySel("user-settings-email-input"),
        phoneNumberInput:()=>cy.getBySel("user-settings-phoneNumber-input"),

        firstNameHelperText:()=>cy.get("#user-settings-firstName-input-helper-text"),
        lastNameHelperText:()=>cy.get("#user-settings-lastName-input-helper-text"),
        emailHelperText:()=>cy.get("#user-settings-email-input-helper-text"),
        phoneNumberHelperText:()=>cy.get("#user-settings-phoneNumber-input-helper-text"),

        savebutton:()=>cy.getBySel("user-settings-submit")
    }
    clickUserSettingLocation(){
        this.element.userSettingLoca().click();
    }
    checkUserSettingForm(){
        this.element.userSettingForm().should("be.visible");
    }
 
}

export {UserPage};