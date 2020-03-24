module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    Aliplayer: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "padded-blocks": [2, 'never'],
    "vue/require-v-for-key": [1],
    "no-multi-spaces": [0],
    "no-underscore-dangle": [0],
    "no-multi-assign": [0],
    'comma-dangle': [0],
    'no-cond-assign': [0],
    'vue/no-v-html': [0],
    'vue/max-attributes-per-line': [0],
    'vue/no-parsing-error': 0,
    'quotes': [1, 'single'],
    // 'no-new': 0,
    'global-strict': 0,
    'no-unused-expressions': 0,
    'no-extend-native': 0,
    'no-undef': 0,
    'prefer-promise-reject-errors': 0,
    'semi': [2, 'always'],
    'no-extra-semi': 1,
    'no-unused-vars': 0,
    'no-mixed-spaces-and-tabs': 2,
    'curly': [0],
    'indent': [0, 4, {'SwitchCase': 1}],
    'no-console': 0,
    'no-trailing-spaces': [1, {'skipBlankLines': true}],
    'no-unreachable': 1,
    'no-alert': 0,
    'one-var': 0,
    'linebreak-style': [2, 'unix'],
    // allow async-await
    'generator-star-spacing': 'off',
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
