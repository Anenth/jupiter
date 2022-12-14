module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'airbnb-typescript/base'],
  plugins: ['import', 'prettier'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
