module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 9999,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        endOfLine: 'auto'
      }
    ],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Layer', 'Location', 'Menu', 'List', 'Read', 'Indicator', 'Direction', 'Timeline', 'Video', 'Category', 'Banner', 'Hgroup', 'Card', 'Information', 'Promotion', 'Icon', 'Hero', 'Cell', 'Half', 'Button', 'Field', 'Upload', 'Filter2', 'Thumbnail', 'Heading', 'Gravity', 'Main', 'Surf', 'Finder', 'Search', 'Register', 'Login', 'Picture', 'Header', 'Navigation', 'Utility', 'Container', 'Footer']
      }
    ]
  }
};
