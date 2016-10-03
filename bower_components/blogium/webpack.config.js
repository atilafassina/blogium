'use strict';

var webpack = require('webpack'),
  banner = `
Blogium v1.0.0
https://github.com/atilafassina/blogium

Licensed MIT © Atila Fassina
`;

module.exports = {
  entry: [
  './src/blogium'
  ],
  output: {
    libraryTarget: 'umd',
    library: 'Blogium',
    path: './dist',
    filename: 'blogium.js'
  },

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

  watch: false,
  devtool: 'source-map',

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: {
          beautify: true
      },
      compress: {
          drop_debugger: true,
          warnings: false
      },
    }
  ),
    new webpack.BannerPlugin(banner)
  ],

  devServer: {
    contentBase: "./"
  }
}
