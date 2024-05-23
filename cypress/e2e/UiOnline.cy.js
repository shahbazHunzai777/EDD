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
    'https://uioSTGrf.edd.ca.gov/uioSTGrf/Pages/Public/ExternalUser/UIOnlineLandingPage.aspx',
    'https://uiouatRF.edd.ca.gov/uiouatrf/Pages/Public/ExternalUser/UIOnlineLandingPage.aspx',
  ];

  urls.forEach((url, index) => {
    it(`Visits ${url} and logs in`, function () {
      cy.visit(url)
        .then(() => {
          cy.wait(1000);

          cy.get(customPortalTemplate)
            .find('.form-control.edd-input')
            .eq(0)
            .should('be.visible')
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
            .should('be.visible')
            .click()
            .should('be.visible');

            cy.screenshot({
              capture: 'viewport',
            });
            cy.wait(3000)
            
          cy.origin(
            url,
            () => {
            cy.get('#contentMain_ucExternalUserLoginUserNameTemplate_btnSubmit').should('be.visible');
            cy.screenshot({
              capture: 'viewport',
            });
            cy.wait(1000)
            cy.screenshot();
            cy.wait(1000)
            cy.screenshot()
          });
       });
     });
  });
});

