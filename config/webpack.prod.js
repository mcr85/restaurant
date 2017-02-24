'use strict'

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const helpers = require('./helpers')
const autoprefixer = require('autoprefixer')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const WebpackSHAHash = require('webpack-sha-hash')

const METADATA = webpackMerge(commonConfig.metadata, {
  ENV: process.env.NODE_ENV = process.env.ENV = 'production',
  PRODUCTION: true,
  DEVELOPMENT: false
})

module.exports = function (env) {
  return webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: [
            /\.e2e\.ts$/,
            /\.spec\.ts$/
          ],
          use: [
            'ng-annotate-loader',
            'awesome-typescript-loader'
          ]
        },
        {
          test: /\.scss$/,
          loader: ExtractTextWebpackPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!postcss-loader!sass-loader'
          })
        }
      ]
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          postcss: [autoprefixer]
        }
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
        ]),
        chunks: Infinity
      }),

      new webpack.optimize.UglifyJsPlugin({
        beautify: false, // set to true for debugging
        // dead_code: false, // uncomment for debugging
        // unused: false, // uncomment for debugging
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
          except: [
            // list strings that should not be mangled here
          ]
        },
        compress: {
          screw_ie8: true
            // uncomment for debugging
            // keep_fnames: tr
            // drop_debugger: false,
            // dead_code: false,
            // unused: false
        },
        comments: false // set to true for debugging
      }),

      new CompressionPlugin({
        regExp: /\.css$|\.html$|\.js$|\.map$/,
        threshold: 2 * 1024
      }),

      new WebpackSHAHash()
    ]
  })
}

