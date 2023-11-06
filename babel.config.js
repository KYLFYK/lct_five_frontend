module.exports = {
  presets: [
    '@babel/react',
    '@babel/typescript',
    ['@babel/env', { modules: false }],
    [
      '@emotion/babel-preset-css-prop',
      {
        labelFormat: 'always',
      },
    ],
  ],
  plugins: ['@emotion'],
};
