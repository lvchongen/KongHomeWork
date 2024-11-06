describe("Test", () => {
  it("tests Test", () => {
    cy.viewport(1920, 400);
    cy.visit("chrome://new-tab-page-third-party/");
    cy.visit("http://localhost:8002/default/overview");
    cy.get("[data-testid='action-button']").click();
    cy.get("[data-testid='gateway-service-name-input']").click();
    cy.get("[data-testid='gateway-service-name-input']").type("Te");
    cy.get("[data-testid='gateway-service-name-input']").type("TestSe");
    cy.get("[data-testid='gateway-service-name-input']").type("TestService");
    cy.get("[data-testid='gateway-service-url-input']").click();
    cy.get("[data-testid='gateway-service-url-input']").type("https://www.google.com");
    cy.get("[data-testid='service-form-submit']").click();
  });
});
