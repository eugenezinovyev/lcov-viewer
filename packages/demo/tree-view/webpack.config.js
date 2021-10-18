const path = require('path');
const baseConfig = require('../../../webpack.base-config');

module.exports = (env, argv) => ({
  ...baseConfig(env, argv),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
});
