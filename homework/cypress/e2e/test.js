import OverViewPage from '../support/pages/overview_page'
import ServicesPage from '../support/pages/services_page';

describe('example to-do app', () => {

  it('gets the service count value', () => {
    const overviewPage = new OverViewPage();
    overviewPage.getServiceCount().then(value => {
      cy.log('Service Count Value:', value)
      expect(value).to.exist
    })
  })

  it('gets the route count value', () => {
    const overviewPage = new OverViewPage();
    overviewPage.getRouteCount().then(value => {
      cy.log('Route Count Value:', value)
      expect(value).to.exist
    })
  })

  it('gets the route count value', () => {
    const servicePage = new ServicesPage();
    servicePage.clickCreate();
    servicePage.enterServiceName("TestServiceName");
    servicePage.enterTag("TestTag");
    servicePage.selectFullURL();
  })
})
