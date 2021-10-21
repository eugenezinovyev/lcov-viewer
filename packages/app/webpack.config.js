const path = require('path');
const baseConfig = require('../../webpack.base-config');

module.exports = (env, argv) => {
  const config = {
    ...baseConfig(env, argv),
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
  };

  config.resolve.fallback = {
    fs: false,
    path: false,
  };

  return config;
};
