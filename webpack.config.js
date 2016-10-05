'use strict';

const config = require('./config/config'),
      isDev = config.env !== 'production',
      webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: isDev ? 'inline-sourcemap' : null,
  entry: './app/client/main.js',
  output: {
    path: isDev ? __dirname + '/build/src' : __dirname + '/build/dist',
    filename: 'scripts.min.js'
  },
  plugins: isDev ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
