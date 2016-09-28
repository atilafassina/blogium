var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    autoWatchBatchDelay: 300,

    files: [
      './tests/blogium.js'
    ],

    preprocessors: {
      './src/blogium.js': ['webpack'],
      './tests/blogium.js': ['webpack']
    },

    browsers: ['Chrome'],

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    }
  });
}
