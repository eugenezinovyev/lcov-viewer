const path = require('path');
const baseConfig = require('../../../webpack.base-config');

module.exports = (env, argv) => {
  const config = {
    ...baseConfig(env, argv),
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
  };

  config.module.rules.push({
    test: /sample\.json$/i,
    use: { loader: 'json-loader' }, // I gave up trying to minify asset/source
    type: 'javascript/auto',
  });

  return config;
};
