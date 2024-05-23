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
    'https://sdioextpp1.edd.ca.gov/DIAExtPP1/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx',
    'https://sdioextpp3.edd.ca.gov/DIAExtPP3/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx',
    'https://sdioextpp4.edd.ca.gov/DIAExtPP4/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx',
    'https://sdioextpp2.edd.ca.gov/DIAExtPP2/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx',
  ];

  urls.forEach((url, index) => {
    it(`Visits ${url} and logs in`, function () {
      cy.visit(url)
        .wait(1000);

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

      cy.origin(
            url,
            () => {
              cy.get('#main_cmdClaimantRegistration').should('be.visible');
              cy.screenshot();
      })
    });
  });
});

