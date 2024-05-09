const urls = [
  '/home/caeddicamext_uioperfrf_1/0oa6gzocirj1qKD7y1d7/aln6gzujbuXliKiEc1d7',
  '/home/caeddicamext_sdioextpp1_1/0oa6ge8hos514f7PF1d7/aln6gekjvaRs1RXnR1d7',
  '/home/caeddicamext_uiostgrf_1/0oa6gj2jlz4J3AlIE1d7/aln6gj88wtdBQHuBn1d7',
  '/home/caeddicamext_sdioextpp3_1/0oa6gj5iv0RV7oEyp1d7/aln6gj9fd8WVMSdBa1d7',
  '/home/caeddicamext_sdioextpp4_1/0oa6gpqzu4lcnNeKc1d7/aln6gpsgb1OQOSYis1d7',
  '/home/caeddicamext_eservicespp_2/0oa6h15sjidDLXZ001d7/aln6h18rjmGKwGPuj1d7',
  '/home/caeddicamext_uiouatrf_1/0oa6h0zy2p9Rkyh621d7/aln6h166wwvHkVgGF1d7',
  '/home/caeddicamext_sdioextpp2_1/0oa6grr1wtBFQOAri1d7/aln6grrzu18k4qRTS1d7',
  '/home/caeddicamext_eservicest1_1/0oa6l8t34kRcwsiSE1d7/aln6l9di1qJKd3QF81d7'
].map(url => `https://t1myedd.edd.ca.gov/s/scplogin?language=en_US${url}`);

const loginUrl = 'https://t1myedd.edd.ca.gov/s/scplogin?language=en_US';
const customPortalTemplate = '#CustomerPortalTemplate';
const user = require('../fixtures/user.json');

describe('Authentication flow', function () {
  const login = (url) => {
    cy.visit(url);

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
      
  };

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  urls.forEach(url => {
    it(`Login test for ${url}`, () => {
      login(url);
      cy.wait(15000).screenshot(url.substring(url.lastIndexOf('/') + 1).replaceAll('_', ' '));
      cy.request(url).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});


