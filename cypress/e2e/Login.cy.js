const customPortalTemplate = '#CustomerPortalTemplate';
const user = require('../fixtures/user.json');

describe('Authentication flow', function () {
  beforeEach(() => {
    cy.fixture('user').as('user');
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  it('Redirects to login', () => {
    cy.visit('https://eddui--preprod2.sandbox.my.site.com/s/scplogin')
      .wait(3000);

    cy.url()
      .should('include', '/s/scplogin');

    cy.get(customPortalTemplate)
      .find('.form-control.edd-input')
      .eq(0)
      .focus()
      .type(user.username)
      .should('have.value', user.username)
      .trigger('input');

    cy.get(customPortalTemplate)
      .find('[name="Login password"]')
      .should('have.value', '')
      .type(user.password)
      .should('have.value', user.password)
      .trigger('input');

    cy.get(customPortalTemplate)
      .find('[type="submit"]')
      .click()
      .should('be.visible');

    cy.url().should('include', '/s/');
    cy.wait(3000);
    cy.screenshot();

    cy.get(customPortalTemplate)
      .find('.card-body')
      .find('button.edd-btn')
      .first()
      .click();
    cy.screenshot();
  });
});

//test