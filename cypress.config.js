const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const fs = require('fs');
const path = require('path');

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  allureWriter(on, config);

  on('after:spec', (spec, results) => {
    if (results && results.tests) {
      const jsonOutput = path.join(config.projectRoot, 'cypress', 'cucumber-json', `${path.basename(spec.relative, '.feature')}.json`);
      const jsonDir = path.dirname(jsonOutput);

      if (!fs.existsSync(jsonDir)) {
        fs.mkdirSync(jsonDir, { recursive: true });
      }

      const cucumberJson = results.tests.map(test => {
        const steps = test.attempts && test.attempts[0] && test.attempts[0].steps ? test.attempts[0].steps.map(step => ({
          keyword: step.keyword || "Step",
          name: step.name,
          result: {
            status: step.state || "skipped", // Capturar el estado del paso, o "skipped" si no está definido
            duration: step.wallClockDuration || 0 // Capturar la duración del paso
          },
          line: step.line || 0,
          match: {
            location: step.invocationLocation || "unknown"
          }
        })) : [];

        const lineMatch = test.title[0] ? test.title[0].match(/(\d+):\d+/) : null;
        const line = lineMatch ? parseInt(lineMatch[1], 10) : 0;

        return {
          keyword: "Scenario",
          name: test.title.join(' '),
          description: "",
          line: line,
          id: test.id,
          type: "scenario",
          steps: steps,
          tags: test.tags || []
        };
      });

      const feature = {
        uri: spec.relative,
        elements: cucumberJson,
        id: path.basename(spec.relative, '.feature'),
        keyword: 'Feature',
        name: path.basename(spec.relative, '.feature').replace(/-/g, ' '),
        description: '',
        line: 1,
        tags: [],
      };

      fs.writeFileSync(jsonOutput, JSON.stringify([feature], null, 2)); // Envolver en una matriz
    } else {
      console.warn(`No test results found for spec: ${spec.relative}`);
    }
  });

  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
    env: {
      allureReuseAfterSpec: true,
    },
  },
});
