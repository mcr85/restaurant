const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = env => {
  return {
    entry: {
      'app': './client/app/index.ts',
      'style': './client/app/main.sass'
    },
    output: {
      path: resolve(__dirname, 'public'),
      filename: '[name].js',
      chunkFilename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['', '.ts', '.js', '.json']
    },
    module: {
      loaders: [
        {test: /\.ts$/, loader: 'ng-annotate!ts-loader', exclude: /node_modules/},
        {test: /\.html$/, loader: 'raw', exclude: /node_modules/},
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader'
          })},
        {
          test: /\.sass$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!sass-loader'
          })},
        {test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url'}
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  }
}
