const babelJestMd = require('babel-jest');
const babelJest = babelJestMd.__esModule ? babelJestMd.default : babelJestMd;

module.exports = babelJest.createTransformer({
  presets: [
    require.resolve('babel-preset-react-app'),
  ],
  babelrc: false,
  configFile: false,
});
