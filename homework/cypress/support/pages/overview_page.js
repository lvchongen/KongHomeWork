class OverViewPage{

    constructor() {
        cy.visit('overview');
    }

    getServiceCount() {
        //Wait for the service count refresh
        cy.wait(3000);
        return cy.xpath("//div[@data-testid='Services']//div[@class='metric-value-text']").should('be.visible').invoke('text');
    }

    getRouteCount(){
        //Wait for the route count refresh
        cy.wait(3000);
        return cy.xpath("//div[@data-testid='Routes']//div[@class='metric-value-text']").should('be.visible').invoke('text');
    }

}


export default OverViewPage;