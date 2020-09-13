const path = require('path')

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['react-hooks'],
  rules: {
    semi: ['error', 'never'],
    'no-debugger': 'error',
    'max-lines': [
      'error',
      {
        max: 400,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: './',
      },
    ],
    'import/extensions': [
      'error',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      },
    ],
    'import/prefer-default-export': ['off'],
    'import/no-default-export': ['error'],
    'no-underscore-dangle': ['off'],
    'no-multi-assign': ['off'],
    'max-classes-per-file': ['off'],
    'no-process-env': ['error'],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/camelcase': [
      'error',
      {
        properties: 'never',
      },
    ],
    '@typescript-eslint/member-delimiter-style': ['off'],
    '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/jsx-no-lambda': 'off',
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/ban-ts-ignore': ['off'],
    'multiline-comment-style': 'error',
    'react/prop-types': ['off'],
    'react/display-name': ['warn'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'jsx-a11y/anchor-is-valid': 'off',
  },
  env: {
    jest: true,
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [['@', path.join(__dirname, 'src')]],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
