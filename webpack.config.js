const webpack = require('webpack')
const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const autoprefixer = require('autoprefixer')

module.exports = env => {
  return {
    devtool: 'source-map',
    entry: {
      'vendor-styles': './client/vendor_styles.ts',
      'main-styles': './client/main_styles.ts',
      'vendor': './client/vendor.ts',
      'main': './client/main.ts'
    },
    output: {
      path: resolve(__dirname, 'public'),
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    devServer: {
      proxy: {
        '/api/**': {
          target: 'http://localhost:3000',
          secure: false
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: ['ng-annotate', 'ts-loader']
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          loader: 'raw'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
          // loader: ExtractTextPlugin.extract({
          //   fallbackLoader: 'style-loader',
          //   loader: 'css-loader'
          // })
        },
        {
          test: /\.sass|\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1
              }
            },
            // {
              // loader: 'postcss-loader',
              // options: {
              //   plugins: 'autoprefixer'
              // }
            // },
            'sass-loader'
          ]
          // loader: 'style!css?sourceMap?sourceMap!sass?sourceMap'
          // loader: ExtractTextPlugin.extract({
          //   fallbackLoader: 'style-loader',
          //   loader: 'css?sourceMap!postcss?sourceMap!sass?sourceMap'
          // })
        },
        { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url-loader' }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      // new ExtractTextPlugin('[name].css'),
      new HtmlWebpackPlugin({
        template: './client/index.html'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'commmons',
        chunks: ['vendor', 'main']
      }),
      // autoprefixer
    ],
    // postcss: [
    //   autoprefixer({
    //     brosers: ['last 2 versions']
    //   })
    // ]
  }
}
