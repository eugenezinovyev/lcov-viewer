const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  const analyze = argv.analyze === true;
  const isProduction = mode === 'production';

  return {
    mode,
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      open: true,
      compress: true,
      historyApiFallback: true,
      host: 'localhost',
    },
    resolve: {
      alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
        'react/jsx-runtime': 'preact/jsx-runtime',
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: 'index.html' }),
      isProduction && new MiniCssExtractPlugin(),
      analyze && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        isProduction && new JsonMinimizerPlugin(),
        isProduction && new CssMinimizerPlugin(),
      ].filter(Boolean),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|cjs|mjs)$/i,
          exclude: /node_modules[\\/](?!(react-dropzone)).*/,
          use: {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
        },
        {
          test: /\.less$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'less-loader',
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: 'asset',
        },
      ],
    },
  };
};
