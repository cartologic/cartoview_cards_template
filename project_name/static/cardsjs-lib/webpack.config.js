var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'src/');

let layersjsx = APP_DIR + '/layers.jsx'
let mapsjsx = APP_DIR + '/maps.jsx'
let appsjsx = APP_DIR + '/apps.jsx'

var config = {
  context: __dirname,
  entry: {
    layers: layersjsx,
    maps: mapsjsx,
    apps: appsjsx
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