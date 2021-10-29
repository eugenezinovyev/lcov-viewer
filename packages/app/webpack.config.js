const path = require('path');
const baseConfig = require('../../webpack.base-config');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const outputPath = path.resolve(__dirname, './dist');
  const config = {
    ...baseConfig(env, argv),
    entry: './src/index.js',
    output: { path: outputPath },
  };

  config.plugins.push(new CopyPlugin({
    patterns: [
      { from: 'public', to: outputPath },
    ],
  }));

  config.resolve.fallback = {
    fs: false,
    path: false,
  };

  return config;
};
