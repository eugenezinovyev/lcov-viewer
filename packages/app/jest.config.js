const configurator = require('../../jest.base-config');

const config = configurator({
  coverageReporters: [
    'lcov',
    'json',
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
    '\.less$',
  ],
});

module.exports = config;
