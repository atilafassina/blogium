'use strict';

module.exports = {
  entry: [
  './src/blogium'
  ],
  output: {
    path: './dist',
    filename: 'blogium.js'
  },

  watch: false,
  devtool: 'source-map',

  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets:['es2015']
      }
    }]
  },

  devServer: {
    contentBase: "./dist"
  }
}
