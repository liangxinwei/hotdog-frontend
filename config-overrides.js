/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const {
  override,
  addLessLoader,
  addBabelPlugins,
  removeModuleScopePlugin,
  addWebpackAlias,
} = require('customize-cra')

const antdThemeVars = require('./src/themed/antd-theme-vars')

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: antdThemeVars,
    },
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  ...addBabelPlugins('@babel/plugin-syntax-dynamic-import'),
  removeModuleScopePlugin(),
)
