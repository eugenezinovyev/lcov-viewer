const configurator = require('../../jest.base-config');

const config = configurator({
  coverageReporters: [
    'lcov',
    'json',
    '@lcov-viewer/istanbul-report'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/mocks/',
    '\.less$',
  ],
});

module.exports = config;
