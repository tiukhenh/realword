const { defineConfig } = require("cypress");

const cucumber = require('cypress-cucumber-preprocessor').default

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsBuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

// const cucumber = require("@badeball/cypress-cucumber-preprocessor");
const esbuild = require("@bahmutov/cypress-esbuild-preprocessor");

// const allureWriter = require('@shelex/cypress-allure-plugin/writer');

const mysql = require("mysql2")
function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db);
  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        // console.log(results)
        return resolve(results);
      }
    });
  });
}

module.exports = defineConfig({
  // reporter: 'cypress-multi-reporters',
  // reporterOptions: {
  //   configFile: 'reporter-config.json',
  // },

  // "reporter": "cypress-mochawesome-reporter",
  // "reporterOptions": {
  //   "reportDir": "cypress/reports",
  //   "charts": true,
  //   "html": true,
  //   "json":false,
  //   "reportPageTitle": "My Test Suite",
  //   "embeddedScreenshots": true,
  //   "inlineAssets": true
  // },
  // "video": false,
    // reporter: "cypress-mochawesome-reporter",
    // reporterOptions: {
    //     reportDir: "cypress/reports/mocha",
    //     quite: true,
    //     overwrite: false,
    //     html: true,
    //     json: true,
    //     charts: true,
    //     embeddedScreenshots: true,
    //     inlineAssets: true,
    //     screenshotOnRunFailure: true,
        
    // },
    "reporter": "mochawesome",
    "reporterOptions": {
      configFile: 'reporter-config.json',
      "reportDir": "cypress/reports/mochawesome-report",
      "html": false,
      "json":true,
      "overwrite": false,
      "charts": true,
      "embeddedScreenshots": true,
      "inlineAssets": true,
    
    },
  "video": false,
  e2e: {
    async setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // Usage: cy.task('queryDb', query)
      on("task", {
        queryDb: query => {
          return queryTestDb(query, config);
        }
      });
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
      })
      
      // implement node event listeners here
      const bundler = createBundler({
        plugins: [createEsBuildPlugin(config)],
      });
      on("file:preprocessor", esbuild());
      // on("file:preprocessor", cucumber());
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      // allureWriter(on, config);
      return config;
    },
    
    screenshotsFolder: "cypress/reports/mochareports/assets",
    supportFile:"cypress/support/e2e.ts",
    specPattern: [/*"cypress/integration/*.feature",*/"cypress/integration/ui/newTransaction.spec.ts"/*,"cypress/integration/dataTest/*.spec.ts",'cypress/integration/api/*.api.spec.ts'*/],
    baseUrl: 'http://localhost:3003',
    video:false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    charts: true,
    env: {
      allureReuseAfterSpec: true,
      "db": {
        'host': '127.0.0.1',
        "port":'3306',
        "user":"root",
        "password":"Ongtukhanh1607",
        'database':'cypress_realword'
      }
    }
  },
});
 
