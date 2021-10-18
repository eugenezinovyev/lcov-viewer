const configurator = require('../../jest.base-config');
const path = require('path');

const config = configurator({
  coverageReporters: [
    'lcov',
    '@lcov-viewer/istanbul-report'
  ],
});

module.exports = config;
