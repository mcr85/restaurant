const { resolve } = require('path')

module.exports = env => {
  return {
    entry: './client/app/index.ts',
    output: {
      filename: 'build.js',
      path: resolve(__dirname, 'public')
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['', '.ts', '.js', '.json']
    },
    module: {
      loaders: [
        {test: /\.ts$/, loader: 'ng-annotate!ts-loader', exclude: /node_modules/},
        {test: /\.html$/, loader: 'raw', exclude: /node_modules/},
        {test: /\.styl$/, loader: 'style!css!stylus'},
        {test: /\.css$/, loader: 'style!css'},
        {test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url'}
      ]
    }
  }
}
