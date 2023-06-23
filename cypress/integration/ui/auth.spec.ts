import { SignupPage } from "../../support/ObjectPages/signup";
describe('auth function', () => {
  const usernames=['Khanh','Dung']
  beforeEach(function(){
    cy.intercept("POST", "/users").as("signup");
    
  })
  it.only(' sign-up, login, and logout successfully ', () => {
    usernames.forEach((username,index)=>{
      cy.task('queryDb',"select * from cypress_realword.user where username ='"+`${username}`+"'")
      .then(function(returnObject) {
        const results = returnObject[0]
        cy.log('DB records count is => '+ results.firstName);
          //signup
          cy.visit('/signup');
          var signup= new SignupPage();
          signup.typeFirstNameInput(results.firstName);
          signup.typeLastNameInput(results.lastName);
          signup.typeUsertNameInput(results.username);
          signup.typePasswordInput(results.password);
          signup.typeConfirmPasswordInput(results.password);
          signup.clickSignup();
          cy.wait("@signup");
          cy.Snapshot("SingUp");

          //login
          cy.login(results.username,results.password);
          cy.xpath('//h2[@class="MuiTypography-root MuiTypography-h6"]').should('have.text','Get Started with Real World App');
          cy.getBySel("user-onboarding-next").click();
          cy.Snapshot("Login");

          //create bank acc
          cy.get('[name="bankName"]').type("The Best Bank");
          cy.get('[name="routingNumber"]').type("987654321");
          cy.get('[name="accountNumber"]').type("123456789");
          cy.get('[type="submit"]').click();

          cy.getBySel("user-onboarding-dialog-title").should("contain", "Finished");
          cy.getBySel("user-onboarding-next").click();
          cy.getBySel("transaction-list").should("be.visible");
          cy.Snapshot("create bank account");

          // logout
          cy.getBySel("sidenav-signout").click();
          cy.location("pathname").should("eq", "/signin");
          cy.Snapshot("Logout");
      })
    })
    
  });
  it("Login errors", ()=> {
    cy.visit("/singin");

    cy.getBySel("signin-username").type("User").find("input").clear().blur();
    cy.get("#username-helper-text").should("be.visible").and("contain", "Username is required");

    cy.getBySel("signin-password").type("abc").find("input").blur();
    cy.get("#password-helper-text").should("be.visible").and("contain", "Password must contain at least 4 characters");

    cy.getBySel("signin-submit").should("be.disabled");
    cy.Snapshot();

  });
  it("Login with user is invalid",()=>{
    cy.login("hgkifd","98767123");

    cy.getBySel("signin-error").should('be.visible').and("contain","Username or password is invalid");
    cy.Snapshot();
  });
  it("Login with password is invalid",()=>{
    cy.login("Khanh","98767123");

    cy.getBySel("signin-error").should('be.visible').and("contain","Username or password is invalid");
    cy.Snapshot();
  });
  it("Signup errors", ()=> {
    cy.visit("/signup");
    var signup= new SignupPage();
    signup.element.firstNameinput().type('First').clear().blur();
    signup.element.errorfirstName().should("be.visible").and("contain", "First Name is required");

    signup.element.lastNameinput().type('Last').clear().blur();
    signup.element.errorlastName().should("be.visible").and("contain", "Last Name is required");

    signup.element.usernameinput().type('User').clear().blur();
    signup.element.errorusername().should("be.visible").and("contain", "Username is required");

    signup.element.passwordinput().type('password').clear().blur();
    signup.element.errorpassword().should("be.visible").and("contain", "Enter your password");

    signup.element.confirmPasswordinput().type('DIFFERENT PASSWORD').blur();
    signup.element.errorconfirmPassword().should("be.visible").and("contain", "Password does not match");

    signup.element.signupButton().should("be.disabled");
    cy.Snapshot();

  });

})