const path = require('path');
const baseConfig = require('../../webpack.base-config');

module.exports = (env, argv) => ({
  ...baseConfig(env, argv),
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
    },
  },
});
