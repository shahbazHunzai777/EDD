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
    'https://sdioextpp1.edd.ca.gov/DIAExtPP1',
    'https://sdioextpp3.edd.ca.gov/DIAExtPP3',
    'https://sdioextpp4.edd.ca.gov/DIAExtPP4',
    'https://sdioextpp2.edd.ca.gov/DIAExtPP2',
  ];

  urls.forEach((url, index) => {
    it(`Visits ${url} and logs in`, function () {
      // Replace with the actual endpoint
      cy.intercept('GET', '**//DIAExtPP3/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx').as('pageLoad'); // Adjust this path to match your application

      cy.visit(url);

      // Wait for the specific request to complete
      cy.wait(1000);

      cy.get(customPortalTemplate)
        .find('.form-control.edd-input')
        .eq(0)
        .focus()
        .type(userObj.user1.username)
        .should('have.value', userObj.user1.username)
        .trigger('input');

      cy.get(customPortalTemplate)
        .find('[name="Login password"]')
        .should('have.value', '')
        .type(userObj.user1.password)
        .should('have.value', userObj.user1.password)
        .trigger('input');

      cy.get(customPortalTemplate)
        .find('[type="submit"]')
        .click()
        .should('be.visible');

      cy.screenshot();
      cy.get('#main_cmdClaimantRegistration').screenshot();

      cy.url().then((loggedInUrl) => {
        cy.request({
          method: 'GET',
          url: loggedInUrl + '/rest/v1/',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          expect(response.status).to.equal(200);
        });
      });
    });
  });
});
