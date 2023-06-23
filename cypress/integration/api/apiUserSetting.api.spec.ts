describe("Users Setting API", function () {

    // Tobe clearn code and the next gen shouldn't take time for read code
    // instead of we need to add the clarification or comments for each action or each line
    // please apply for our project
    beforeEach(function () {
        //login
        cy.request("POST", `http://localhost:3004/login`, {
            username : 'Khanh',
            password : 'Khanh@123',
          }).as('login');
        cy.get('@login').then((response) => {
        expect(response.status).to.eq(200);     
        });
    })
    it("update a new user", function () {  
        cy.request("PATCH", `http://localhost:3004/users/JzARkarBH`, {
            firstName:"Khanh",
            lastName: "Ong",
            email: "Rebeca35@yahoo.com",
            phoneNumber: "072-208-4283",
        }).as('createUser')
        cy.get('@createUser').then((response) => {
          expect(response.status).to.eq(204);
          cy.log(JSON.stringify(response.body));
          // can you add the expectation here, beacause after any an action we need to verifycation for that
        });
    });

});
