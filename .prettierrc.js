module.exports = {
  semi: true,
  printWidth: 180,
  tabWidth: 2,
  singleQuote: true,
  arrowParens: 'always',
  trailingComma: 'es5',
  overrides: [
    {
      files: ['*.json', '.*rc'],
      options: {
        trailingComma: 'none',
      },
    },
    {
      files: '*.hbs',
      options: {
        parser: 'html',
      },
    },
  ],
};
