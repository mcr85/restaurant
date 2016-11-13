const webpack = require('webpack')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    'vendor-styles': './client/vendor_styles.ts',
    'app-styles': './client/main_styles.ts',
    'vendor': './client/vendor.ts',
    'app': './client/main.ts'
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
          'sass-loader'
        ]
      },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url-loader' }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      chunks: ['vendor', 'app']
    })
  ]
}
