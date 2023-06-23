describe("Test database",()=>{
    it("select user first",()=>{
        cy.task('queryDb',"select * from cypress_realword.user")
			.then(function(returnObject) {
				//expect(result);
				const results = returnObject[0]
                cy.log('DB records count is => '+ JSON.stringify(results));
                cy.log('user Id => '+ JSON.stringify(results.id));
                cy.log('username => '+ JSON.stringify(results.username));
	    }); 
    })
    it("select transaction first",()=>{
        cy.task('queryDb',"select * from cypress_realword.transaction")
			.then(function(returnObject) {
				//expect(result);
				const results = returnObject[0]
                cy.log('DB records count is => '+ JSON.stringify(results));
                cy.log('recive Id => '+ JSON.stringify(results.receiverId));
                cy.log('send Id => '+ JSON.stringify(results.senderId));
	    }); 
    })
})