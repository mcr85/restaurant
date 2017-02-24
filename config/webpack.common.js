'use strict'

const path = require('path')
const webpack = require('webpack')
const helpers = require('./helpers')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  stats: {
    colors: true,
    reasons: true
  },

  entry: {
    'polyfills': helpers.root('src/polyfills.ts'),
    'main-styles': helpers.root('src/main-styles.ts'),
    'vendor-styles': helpers.root('src/vendor-styles.ts'),
    'vendor': helpers.root('src/vendor.ts'),
    'main': helpers.root('src/main.ts')
  },

  output: {
    path: helpers.root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.sass', '.scss', '.html'],
    modules: [
      helpers.root('src'),
      helpers.root('node_modules')
    ],
    alias: {
      img: path.resolve(__dirname, '../src/app/assets/img'),
      common: path.resolve(__dirname, '../src/app/common'),
      core: path.resolve(__dirname, '../src/app/core')
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        exclude: [helpers.root('node_modules')]
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: [helpers.root('node_modules/rxjs')]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextWebpackPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        test: /\.html$/,
        exclude: [
          helpers.root('src/index.html')
        ],
        use: [
          'ngtemplate-loader',
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              conservativeCollapse: false
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|ttf|otf|eot|svg|woff(2)?)$/,
        loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new ExtractTextWebpackPlugin({
      filename: '[name].css',
      disable: false
    }),
    new CheckerPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: helpers.root('src/app/assets'),
        ignore: [
          'sass/',
          '*.sass',
          '*.scss',
          '*.md',
          '*.txt'
        ]
      }
    ]),
    new HtmlWebpackPlugin({
      template: helpers.root('src/index.html'),
      chunksSortMode: helpers.packageSort([
        'polyfills',
        'vendor-styles',
        'main-styles',
        'vendor',
        'main'
      ])
    })
  ],
  node: {
    global: true,
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}
