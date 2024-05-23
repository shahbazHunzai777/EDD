const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: true,
    saveJson: true,
    embeddedScreenshots: true,
    charts: true, 
    inlineAssets: true,

  },
  e2e: {
    // pageLoadTimeout: 120000,
    // defaultCommandTimeout: 30000, 
    // requestTimeout: 30000,
    // responseTimeout: 30000,
    // experimantalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
