module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['sort-destructure-keys', 'simple-import-sort', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    semi: 'error',
    curly: 'error',
    'prettier/prettier': ['error', { tabWidth: 2, endOfLine: 'auto' }],
    'no-var': 'error',
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'prefer-const': 'error',
    'no-use-before-define': 'error',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'prefer-template': 'error',
    'object-shorthand': 'warn',
    'no-use-before-define': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-destructure-keys/sort-destructure-keys': 2,
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
