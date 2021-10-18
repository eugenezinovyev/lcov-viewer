const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const baseConfig = require('../../webpack.base-config');

module.exports = (env, argv) => {
  const config = {
    ...baseConfig(env, argv),
    entry: {
      app: './app/index.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'lib/assets'),
    },
  };

  const htmlWebpackPlugin = config.plugins.find(plugin => plugin instanceof HtmlWebpackPlugin) || new HtmlWebpackPlugin();
  htmlWebpackPlugin.userOptions.template = 'app/index.html';
  htmlWebpackPlugin.userOptions.inject = 'body';

  config.plugins.push(new HTMLInlineCSSWebpackPlugin());
  config.plugins.push(new HtmlInlineScriptPlugin([/app.js$/]));

  config.plugins.push(new CopyPlugin({
    patterns: [
      { from: 'src', to: path.resolve(__dirname, 'lib') },
    ],
  }));

  return config;
};
