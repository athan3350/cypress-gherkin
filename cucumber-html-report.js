const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'cypress/cucumber-json',
  reportPath: './reports/cucumber-html',
  metadata: {
    browser: {
      name: 'chrome',
      version: '60'
    },
    device: 'Local test machine',
    platform: {
      name: 'ubuntu',
      version: '16.04'
    }
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Custom project' },
      { label: 'Release', value: '1.2.3' },
      { label: 'Cycle', value: 'B11221.34321' },
      { label: 'Execution Start Time', value: '2024-07-21T00:00:00.000Z' },
      { label: 'Execution End Time', value: '2024-07-21T00:00:00.000Z' }
    ]
  }
});
