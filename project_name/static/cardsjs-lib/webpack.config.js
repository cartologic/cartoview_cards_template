var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'src/');

let materialJSX = APP_DIR + '/materialPages.jsx'

var config = {
  context: __dirname,
  entry: {
    materialComponent: materialJSX,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: "[name].entry.js"
  },
  devtool: "source-map"
};

module.exports = config;