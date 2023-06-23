/// <reference types="cypress" />

Cypress.Commands.add('login', (username, password) => { 
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/signin');
    cy.get('#username').type(username);
    
    cy.get('#password').type(password);
    cy.xpath('//button[@type="submit"]').click();
});
Cypress.Commands.add('logout', () => { 
   // logout
   cy.getBySel("sidenav-signout").click();
   cy.location("pathname").should("eq", "/signin");  
});
Cypress.Commands.add("getBySel", (selector) => {
    return cy.get(`[data-test=${selector}]`);
  });
Cypress.Commands.add("getBySelLike", (selector) => {
    return cy.get(`[data-test*=${selector}]`);
  });
Cypress.Commands.add("Snapshot", (Name) => {
    // @ts-ignore
    let snapshotTitle = cy.state("runnable").fullTitle();
    if (Name) {
      snapshotTitle = snapshotTitle + " - " + Name;
    }
    cy.screenshot(snapshotTitle, {
      // @ts-ignore
      widths: [cy.state("viewportWidth")],
      // @ts-ignore
      minHeight: cy.state("viewportHeight"),
    });
  });
// import * as fs from 'fs';
// Cypress.Commands.add("deleteFile", (filePath) => {
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       // Handle the error if deletion fails
//       console.error(`Failed to delete the JSON file: ${err}`);
//       return;
//     }
//     // File deleted successfully
//     console.log(`JSON file deleted: ${filePath}`);
//   });
// }); 

// const jsonString = fs.readFileSync('D:/2/playwright_orangehrm/filedata.json', 'utf-8');
// var data = JSON.parse(jsonString);

// Delete folder
// Cypress.Commands.add("deleteFile", (filePath) => {
//   fs.removeSync(filePath);
// }); 