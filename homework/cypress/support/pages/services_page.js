class ServicesPage{
    constructor() {
        cy.visit('services');
    }

    //create servcie button
    createButton(){
        return cy.xpath("//a[@href='/default/services/create']")
    }

    clickCreate(){
        this.createButton().click();
    }

    //service name field
    serviceNameField(){
        return cy.xpath("//input[@data-testid='gateway-service-name-input']");
    }

    enterServiceName(name){
        this.serviceNameField().type(name);
    }

    //tag field
    tagField(){
        return cy.xpath("//input[@data-testid='gateway-service-tags-input']");
    }

    enterTag(tag){
        this.tagField().type(tag);
    }

    //Full URL CheckBox
    fullURLField(){
        return cy.xpath("//input[@data-testid='gateway-service-url-radio']");
    }

    selectFullURL(){
        this.fullURLField().click();
    }

    //Upstream URL
    upstreamURLField(){
        return cy.xpath("//input[@data-testid='gateway-service-url-input']");
    }

    enterUpStreamURL(url){
        this.upstreamURLField().type(url);
    }
}


export default ServicesPage;