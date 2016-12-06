'use strict';

//const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
  //context: __dirname + '/frontend',
  entry: {
    app: './frontend/app'
  },

  output: {
    path: __dirname + '/public',  // FS-путь к статике
    publicPath: '/', // Web-путь к статике (CDN?)
    filename: '[name].js'
  },

  watch: true,

  devtool: "source-map",

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'frontend'),
        loader: "babel?presets[]=es2015"
      }, {
        test:   /\.jade$/,
        loader: "jade"
      }, {
        test:   /\.styl$/,
        loader: ExtractTextPlugin.extract('css!stylus')
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },


  plugins: [
    new ExtractTextPlugin('[name].css', {allChunks: true})
  ]

};
