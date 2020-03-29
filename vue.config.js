'use strict';
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = 'hotdog';                                              // page title
const port = process.env.npm_package_config_port;                   // dev port

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: true,
  devServer: {
    port: port,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/v1': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375
          })
        ]
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test

    config.devtool(process.env.NODE_ENV === 'development' ? 'eval-source-map' : false);

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              inline: /runtime\..*\.js$/
            }])
            .end();
          config
            .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // only package third parties that are initially dependent
              },
              commons: {
                name: 'chunk-commons',
                test: resolve('src/components'),
                minChunks: 3,
                priority: 5,
                reuseExistingChunk: true
              }
            }
          });
          config.optimization.runtimeChunk('single');
        }
      );
  }
};
