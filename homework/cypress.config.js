const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8002/default/',
    setupNodeEvents(on, config) {
    },
  },
});