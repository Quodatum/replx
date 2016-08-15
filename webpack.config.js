var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './src/static/replx/app.js',
  output: { path: './src/static/replx/', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};