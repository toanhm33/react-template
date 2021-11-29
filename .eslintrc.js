module.exports = {
  extends: ['prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [1],
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  env: {
    es6: true,
  },
  parser: '@typescript-eslint/parser',
};
