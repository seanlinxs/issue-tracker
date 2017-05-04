const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: ['./server/server.js', './node_modules/webpack/hot//poll?1000'],
  output: {
    path: path.resolve('dist'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: [/^[a-z]/],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015-node4'],
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015-node4'],
        },
      },
    ],
  },
  devtool: 'source-map',
};
