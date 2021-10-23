const configurator = require('../../jest.base-config');

const config = configurator({
  coverageReporters: [
    'lcov',
    '@lcov-viewer/istanbul-report',
  ],
  moduleNameMapper: {
    '^react$': 'preact/compat',
    '^react-dom/test-utils$': 'preact/test-utils',
    '^react-dom$': 'preact/compat',
    '^react/jsx-runtime$': 'preact/jsx-runtime',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/mocks/',
  ],
});

module.exports = config;
