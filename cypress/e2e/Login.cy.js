const urls = [
  'https://uioPERFrf.edd.ca.gov/uioperfrf/Pages/Public/ExternalUser/UIOnlineLandingPage.aspx',
  'https://sdioextpp1.edd.ca.gov/DIAExtPP1/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx',
  'https://uioSTGrf.edd.ca.gov/uioSTGrf/Pages/Public/ExternalUser/UIOnlineLandingPage.aspx',
  'https://sdioextpp3.edd.ca.gov/DIAExtPP3/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx',
  'https://sdioextpp4.edd.ca.gov/DIAExtPP4/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx',
  'https://eservicespp.edd.ca.gov/eservicespp/Secure/RDS/BOSeServices/',
  'https://uiouatRF.edd.ca.gov/uiouatrf/Pages/Public/ExternalUser/UIOnlineLandingPage.aspx',
  'https://sdioextpp2.edd.ca.gov/DIAExtPP2/Pages/Public/ExternalUser/SDIOnlineLandingPage.aspx',
  'https://eservicest1.network1.corp.edd.ca.gov/eservicest1/Protected/RDS/BOSEnrollment/Landingpage/Login',
];

urls.forEach(url => {
  describe(`Login test for ${url}`, function () {
    beforeEach(() => {
      cy.fixture('user').as('user');
    });

    it('Login test', () => {
      cy.request({
        method: 'GET',
        url: url,
        auth: {
          'username': user.username,
          'password': user.password
        },
        failOnStatusCode: false
      }).then((response) => {
        if (response.status === 200) {
          cy.log('200 status code');
        } else if (response.status === 401) {
          cy.log('401 status code');
        } else {
          cy.log('Site is down');
        }
      });
    });
  });
});

