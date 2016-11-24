'use strict';



const webpack = require('webpack'),
  chalk = require('chalk'),
  npmVersion = require('./package.json').version,
  bowerVersion = require('./bower.json').version,
  version = checkVersions(npmVersion, bowerVersion),
  banner = `
Blogium v${version}
https://github.com/atilafassina/blogium

Licensed MIT © Atila Fassina
`;

function checkVersions(npm, bower) {
  if (npm === bower) {
    return npm;
  } else {
    throw new Error(chalk.red.bold('bower.json and package.json versions must be the same'));
  }

}


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
