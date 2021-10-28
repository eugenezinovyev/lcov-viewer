const path = require('path');
const baseConfig = require('../../../webpack.base-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const config = {
    ...baseConfig(env, argv),
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
  };

  const htmlWebpackPlugin = config.plugins.find(plugin => plugin instanceof HtmlWebpackPlugin) || new HtmlWebpackPlugin();
  htmlWebpackPlugin.userOptions.reportDate = new Date().toString();

  config.module.rules.push({
    test: /sample\.json$/i,
    use: { loader: 'json-loader' }, // I gave up trying to minify asset/source
    type: 'javascript/auto',
  });

  return config;
};
