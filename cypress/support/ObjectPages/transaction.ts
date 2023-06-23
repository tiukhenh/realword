class TransactionPage {
    element = {
        newTransactionLoca:()=>cy.getBySel("nav-top-new-transaction"),
        searchInputUser:()=>cy.getBySel('user-list-search-input'),
        selectUser:()=>cy.getBySel("users-list"),
        amountInput:()=> cy.getBySel('transaction-create-amount-input'),
        descriptionInput:()=>cy.getBySel('transaction-create-description-input'),

        submitPay:()=>cy.getBySel('transaction-create-submit-payment'),
        submitRequest:()=>cy.getBySel('transaction-create-submit-request'),

        amountHelperText:()=>cy.get("#transaction-create-amount-input-helper-text"),
        descriptionHelperText:()=>cy.get("#transaction-create-description-input-helper-text"),

        submitExpect:()=>cy.xpath("//h2[contains(@class,'MuiTypography-gutterBottom')]"),

        transactionFirst:()=>cy.getBySel('transaction-list').children().first(),
        detailTransaction:()=> cy.getBySel("transaction-detail-header"),

        buttonLike:()=>cy.getBySelLike("like-button"),
        countlike:()=>cy.getBySelLike("like-count"),

        commentInput:()=> cy.getBySelLike("comment-input"),
        commentList:()=>cy.getBySel("comments-list"),

    }
    clickNewTransaction(){
        this.element.newTransactionLoca().click();
    }
    searchUserToTransaction(name:string){
        this.element.searchInputUser().type(name);
    }
    selectUserToTransaction(name:string){
        this.element.selectUser().children().contains(name).click();
    }
    typeAmountInput(money:string){
        this.element.amountInput().type(money);
    }
    typeDescriptionInput(descirption:string){
        this.element.descriptionInput().type(descirption);
    }
    clickSubmitPay(){
        this.element.submitPay().click();
    }
    clickSubmitRequest(){
        this.element.submitRequest().click();
    }
    submitExpect(type:string){
        this.element.submitExpect().eq(1).should('be.visible').and("contain", type);
    }
    selectTransactionFirst(){
        this.element.transactionFirst().click();
    }
    checkShowDetailTransaction(){
        this.element.detailTransaction().should("be.visible")
    }
    clickButtonLike(){
        this.element.buttonLike().click();
    }
    checkCountLike(){
        this.element.countlike().should("contain", 1);
    }
    checkButtonLikeDisabled(){
        this.element.buttonLike().should("be.disabled");
    }
    commentInput(mesage:string){
        this.element.commentInput().type(`${mesage}{enter}`)
    }
    commentList(mesage:string,index:number){
        this.element.commentList().children().eq(index).contains(mesage)
    }
 
 
}

export {TransactionPage};