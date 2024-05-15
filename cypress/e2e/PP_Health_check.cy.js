const loginUrl = 'https://caeddicamint.oktapreview.com/home/caeddicamint_cubsperfrf_1/0oa6gj0mkwjNtmMo81d7/aln6gj626gsQVSK9H1d7';
const customPortalTemplate = '#form20';
const user = require('../fixtures/user.json');

const urls = [
  'https://caeddicamint.oktapreview.com/home/caeddicamint_cubsperfrf_1/0oa6gj0mkwjNtmMo81d7/aln6gj626gsQVSK9H1d7',
  'https://caeddicamint.oktapreview.com/home/caeddicamint_sdiointpp1_1/0oa6gnp0ntKm5qivz1d7/aln6go2y4ww34hZNL1d7',
  'https://caeddicamint.oktapreview.com/home/caeddicamint_cubsstgrf_1/0oa6h045soZwIkre71d7/aln6h0guom3WW8K5S1d7',
  'https://caeddicamint.oktapreview.com/home/caeddicamint_sdiointpp3_1/0oa6h0mx4g0jRjRl61d7/aln6h0ysn8Z4ZUcti1d7',
  'https://caeddicamint.oktapreview.com/home/caeddicamint_sdiointpp4_1/0oa6gnqqbvAhLvOWM1d7/aln6gnz04yYIpXchM1d7',
  'https://caeddicamint.oktapreview.com/home/caeddicamint_adminutilpp_1/0oa6s6wusbK0Db54k1d7/aln6s71cf2jzjZCSR1d7',
  'https://caeddicamint.oktapreview.com/home/caeddicamint_cubsuatrf_1/0oa6h19riaNJkTR9e1d7/aln6h1fa6kSUV99Md1d7',
  'https://caeddicamint.oktapreview.com/home/caeddicamint_sdiointpp2_1/0oa6h1eg9acaYTE9e1d7/aln6h1hgwhsA0JOCJ1d7',
];

const login = (url) => {
  cy.visit(loginUrl);

  cy.get(customPortalTemplate)
    .find('#input28')
    .eq(0)
    .type('PERF_SCPEXTA_19408@scpperf.com')
    .trigger('input');

  cy.get(customPortalTemplate)
    .find('#input36')
    .type('California@1')
    .trigger('focus');

  cy.get(customPortalTemplate).submit();
};

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Health Check', () => {
  urls.forEach((url) => {
    it(`Visit ${url}`, () => {
      login(url);
      cy.visit(url).then(() => {
        cy.wait(2000);
        cy.get('a')
          .each(($el) => {
            cy.wrap($el)
              .should('have.attr', 'href')
              .then((subUrl) => {
                cy.request(subUrl).then((response) => {
                  expect(response.status).to.eq(200);
                });
              });
          })
          .then(() => {
            cy.screenshot(`after-login-${url.split('/').pop()}`);
          });
      });
    });
  });
});


