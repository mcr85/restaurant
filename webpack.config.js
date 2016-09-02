const { resolve } = require('path')
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const webpack = require('webpack')

module.exports = env => {
  return {
    entry: './client/app/index.ts',
    output: {
      filename: 'build.js',
      path: resolve(__dirname, 'public')
    },
    devtool: 'source-map',
    resolve: {
      root: __dirname,
      extensions: ['', '.ts', '.js', '.json']
    },
    resolveLoader: {
      modulesDirectories: ['node_modules']
    },
    module: {
      loaders: [
        {test: /\.ts$/, loader: 'ts-loader'}
      ]
    }
  }
}
