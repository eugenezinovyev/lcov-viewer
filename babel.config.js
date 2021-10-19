module.exports = {
  plugins: [],
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: { version: '3' },
      },
    ],
    '@babel/preset-react',
  ],
};
