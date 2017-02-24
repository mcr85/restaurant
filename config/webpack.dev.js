'use strict'

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const helpers = require('./helpers')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const METADATA = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8000,
  ENV: process.env.ENV = process.env.NODE_ENV = 'development',
  PRODUCTION: false,
  DEVELOPMENT: true
}

module.exports = function (env) {
  return webpackMerge(commonConfig, {
    devtool: 'source-map',
    cache: true,

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: [/\.e2e\.ts$/, /\.test\.ts$/],
          use: ['ng-annotate-loader', 'awesome-typescript-loader']
        },
        {
          test: [/\.sass$/, /\.scss$/],
          loader: ExtractTextWebpackPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'raw-loader!sass-loader'
          })
        }
      ]
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(METADATA.ENV),
        NODE_ENV: JSON.stringify(METADATA.ENV),
        PRODUCTION: METADATA.PRODUCTION,
        DEVELOPMENT: METADATA.DEVELOPMENT,
        'process.env': {
          ENV: JSON.stringify(METADATA.ENV),
          NODE_ENV: JSON.stringify(METADATA.ENV),
          PRODUCTION: METADATA.PRODUCTION,
          DEVELOPMENT: METADATA.DEVELOPMENT
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: helpers.reverse([
          'polyfills',
          'vendor',
          'main'
        ])
      })
    ],
    devServer: {
      port: METADATA.PORT,
      host: METADATA.HOST,

      proxy: {
        '/api/**': {
          target: 'http://localhost:3000',
          secure: false
        }
      },

      // HTML5 History API support: no need for # in URLs
      // automatically redirect 404 errors to the index.html page
      // uses connect-history-api-fallback behind the scenes: https://github.com/bripkens/connect-history-api-fallback
      // reference: http://jaketrent.com/post/pushstate-webpack-dev-server/
      historyApiFallback: true,

      contentBase: helpers.root('src/app') // necessary so that assets are accessible
    }
  })
}
