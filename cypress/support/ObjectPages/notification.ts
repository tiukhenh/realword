class NotificationPage {
    element = {
       notificationLoca:()=>cy.getBySel('nav-top-notifications-link'),
        notificationList:()=>cy.getBySelLike("notification-list-item")
    }
    clickNotificationIcon(){
        this.element.notificationLoca().click();
    }
    checkFirstItemInNotificationList(name:string,type:string){
        this.element.notificationList().first().should("contain",name).and("contain", type);
    }
}
export {NotificationPage};