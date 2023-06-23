import { Given , Then , When} from "@badeball/cypress-cucumber-preprocessor";
import { TransactionPage } from "../../support/ObjectPages/transaction";
const transaction = new TransactionPage();
Given ('A user open signin page',()=>{
    cy.visit('/signin');
})
When ('User successfully logged in',(table)=>{
    table.hashes().forEach(row => {
        cy.login(row.username,row.password);
    });
})
When ('A User click to select transaction',()=>{
    transaction.selectTransactionFirst();
})
Then ('Verify detail of transaction should be display',()=>{
    transaction.checkShowDetailTransaction();
})
When  ('A user click like button',()=>{
    transaction.clickButtonLike();
}) 
Then ('Verify count variable is added',()=>{
    transaction.checkCountLike();
})
Then ('Verify like button is disable',()=>{
    transaction.checkButtonLikeDisabled();
})
When ('A user enter a commet {string}',(comment)=>{
    transaction.commentInput(comment);
})
Then ('Verify this comment {string} should be display in comment list',(comment)=>{
    transaction.commentList(comment,0)
})