const {
  defineConfig
} = require('cypress');

module.exports = defineConfig({
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/reports/json",
    "overwrite": true,
    "html": true,
    "json": true
  },
  e2e: {
    setupNodeEvents(on, config) {
      //require('mochawesome/plugin')(on);
    },
  },
});