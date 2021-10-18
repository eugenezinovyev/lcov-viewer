const configurator = require('../../jest.base-config');
const path = require('path');

const config = configurator({
  coverageReporters: [
    'lcov',
  ],
});

module.exports = config;
