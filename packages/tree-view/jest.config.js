const configurator = require('../../jest.base-config');

const config = configurator({
  coverageReporters: [
    'lcov',
    'json',
    '@lcov-viewer/istanbul-report'
  ],
});

module.exports = config;
