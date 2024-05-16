const customPortalTemplate = '#CustomerPortalTemplate';
const userObj = require('../fixtures/user.json');

describe('Authentication flow', function () {
  beforeEach(() => {
    cy.fixture('user').as('user');
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  const urls = [
    'https://uioperfrf.edd.ca.gov/uioperfrf/Pages/Public/ExternalUser/UIOnlineLandingPage.aspx',
    'https://sdioextpp1.edd.ca.gov/DIAExtPP1/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx',
    'https://uioSTGrf.edd.ca.gov/uioSTGrf/Pages/Public/ExternalUser/UIOnlineLandingPage.aspx',
    'https://sdioextpp3.edd.ca.gov/DIAExtPP3/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx',
    'https://sdioextpp4.edd.ca.gov/DIAExtPP4/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx',
    'https://eservicespp.edd.ca.gov/eservicespp/Secure/RDS/BOSeServices/',
    'https://uiouatRF.edd.ca.gov/uiouatrf/Pages/Public/ExternalUser/UIOnlineLandingPage.aspx',
    'https://sdioextpp2.edd.ca.gov/DIAExtPP2/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx',
    'https://eservicest1.network1.corp.edd.ca.gov/eservicest1/Protected/RDS/BOSEnrollment/Landingpage'
  ];

  let allUrlsChecked = false;

  urls.forEach((url) => {
    it(`Visits ${url} and logs in`, () => {
      cy.visit(url)
        .wait(10000);

      cy.get(customPortalTemplate)
        .find('.form-control.edd-input')
        .eq(0)
        .focus()
        .type(userObj.user.username)
        .should('have.value', userObj.user.username)
        .trigger('input');

      cy.get(customPortalTemplate)
        .find('[name="Login password"]')
        .should('have.value', '')
        .type(userObj.user.password)
        .should('have.value', userObj.user.password)
        .trigger('input');

      cy.get(customPortalTemplate)
        .find('[type="submit"]')
        .click()
        .should('be.visible');

      cy.wait(10000);

      cy.request({
        method: 'GET',
        url: url + '/rest/v1/',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        expect(response.status).to.equal(200);
      });

      cy.url().should('include', '/s/');

      if (url === urls[urls.length - 1]) {
        allUrlsChecked = true;
      }
    });
  });

  afterEach(() => {
    if (allUrlsChecked) {
      Cypress.runner.stop();
    }
  });
});
