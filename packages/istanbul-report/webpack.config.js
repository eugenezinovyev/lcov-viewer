const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');
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

  config.plugins.push(new CopyPlugin({
    patterns: [
      { from: 'src', to: path.resolve(__dirname, 'lib') },
    ],
  }));

  config.plugins.push(new LicenseWebpackPlugin({
    addBanner: true,
    perChunkOutput: false,
    licenseFileOverrides: {
      '@lcov-viewer/istanbul-report': path.resolve('LICENSE'),
    },
    excludedPackageTest: (packageName) => [
      'preact-compat',
      'preact-hooks',
    ].includes(packageName),
  }));

  config.optimization.minimizer = [
    ...config.optimization.minimizer,
    new TerserPlugin({
      extractComments: false, // prevents TerserPlugin from extracting a [chunkName].js.LICENSE.txt file
      terserOptions: {
        format: {
          // Tell terser to remove all comments except for the banner added via LicenseWebpackPlugin.
          // This can be customized further to allow other types of comments to show up in the final js file as well.
          // See the terser documentation for format.comments options for more details.
          comments: (astNode, comment) => {
            const startsWith = comment.value.startsWith('! licenses are at ');
            console.log(comment.value, startsWith);
            return startsWith;
          },
        },
      },
    }),
  ];

  return config;
};
