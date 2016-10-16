var path = require('path');
var webpack = require('webpack');
var src="./src/static/replx/"; 
module.exports = {
  entry: src+ 'app.jsx',
  output: { path: src, filename: 'bundle.js' },
  
  module: {
    resolveLoader: { root: path.join(__dirname, src) },
    loaders: [
      {
        test: /.js.$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};