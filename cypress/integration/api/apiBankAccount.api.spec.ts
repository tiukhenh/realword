describe("Bank Account API", function () {
    const url ='http://localhost:3004';
    beforeEach(function () {
        //login
        cy.request("POST", `${url}/login`, {
            username : 'Khanh',
            password : 'Khanh@123',
          }).as('login');
        cy.get('@login').then((response) => {
        expect(response.status).to.eq(200);     
        });
    })
    it("creates a new bank account", function () {
        cy.request("POST", `${url}/bankAccounts`, {
            bankName: 'The Best Bank',
            accountNumber: '987654321',
            routingNumber: '123456789',
        }).then((response) => {
            expect(response.status).to.eq(200);
            // this point is corrted, we should add the expected status
            cy.log(JSON.stringify(response.body.account));
            // can you add the expectation here, beacause after any an action we need to verifycation for that
        });
    });
      
    it("delete a bank account", function () {
        const idbank = 'EFdAohjpE'
        cy.request("DELETE", `${url}/bankAccounts/${idbank}`, {}).then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});
