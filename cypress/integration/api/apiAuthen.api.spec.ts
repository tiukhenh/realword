describe("Authen API", function () {
    it("login as user", function () {
        cy.request("POST", `http://localhost:3004/login`, {
            username : 'Khanh',
            password : 'Khanh@123',
          }).as('login');
        cy.get('@login').then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body.user));
            // can you add the expectation here, beacause after any an action we need to verifycation for that
        });

    });
    it("creates a new user and login", function () {
        //create user
        cy.request("POST", `http://localhost:3004/users`, {
          firstName:"Khanh",
          lastName: "Ong",
          username: "TuKhanh",
          password: "Khanh@123"
        }).as('createUser')
        cy.get('@createUser').then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.user.firstName).to.eq('Khanh');
          expect(response.body.user.lastName).to.eq('Ong');
          expect(response.body.user.username).to.eq('TuKhanh');
          cy.log(JSON.stringify(response.body.user)); // Log just to view and debug.
          // can you add the expectation here, beacause after any an action we need to verifycation for that
        });
        //login user
        cy.request("POST", `http://localhost:3004/login`, {
            username : 'TuKhanh',
            password : 'Khanh@123',
          }).as('login');
        cy.get('@login').then((response) => {
            expect(response.status).to.eq(200);
            cy.log(JSON.stringify(response.body.user));
            // can you add the expectation here, beacause after any an action we need to verifycation for that
        });

    });

});
