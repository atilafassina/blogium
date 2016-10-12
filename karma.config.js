var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(karma) {
  karma.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],

    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: karma.LOG_INFO,
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: true,
    autoWatchBatchDelay: 300,

    files: [
      './tests/blogium.js'
    ],

    preprocessors: {
      './src/blogium.js': ['webpack'],
      './tests/blogium.js': ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    }
  });
}
