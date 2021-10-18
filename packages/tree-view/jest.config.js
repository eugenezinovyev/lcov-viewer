const configurator = require('../../jest.base-config');

const config = configurator({
  coverageReporters: [
    'lcovonly',
  ],
});

module.exports = config;
