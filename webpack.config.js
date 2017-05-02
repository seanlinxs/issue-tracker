const path = require('path');

module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.resolve('static'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
    ]
  }
};
