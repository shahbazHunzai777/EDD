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
    'https://t1myedd.edd.ca.gov/s/scplogin?language=en_US'
  ];

  urls.forEach((url, index) => {
    it(`Visits ${url} and logs in`, function () {
      cy.visit(url)
        .wait(1000);

      cy.get(customPortalTemplate)
        .find('.form-control.edd-input')
        .eq(0)
        .focus()
        .type(userObj.user.username)
        .should('have.value', userObj.user.username);

      cy.get(customPortalTemplate)
        .find('[name="Login password"]')
        .type(userObj.user.password)
        .should('have.value', userObj.user.password);

      cy.get(customPortalTemplate)
        .find('[type="submit"]')
        .click()
        .should('be.visible');

      cy.get(customPortalTemplate)
        .find('.edd-btn.edd-btn-primary.mt-auto.align-self-start.w-100')
        .each(($el, index) => {
          it(`Click on button ${index + 1} and take screenshot`, function() {
            $el.click()
              .then(() => {
                cy.screenshot(`login-screenshot-${index + 1}`);
              });
          });
        });
    });
  });
});

