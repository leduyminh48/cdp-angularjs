// Karma configuration
// Generated on Wed Feb 03 2016 10:09:12 GMT+0200 (EET)
/* global module */
/* eslint-disable*/
'use strict';

require('babel-core/register');
const KARMA_ENTRY_FILE = 'karma.entry.js';
const webpackConfig    = require('./webpack.config');
const argv             = require('yargs').argv;
const useCoverage = argv.reporters && argv.reporters.indexOf('coverage') > -1;

module.exports = function (config) {
  'use strict';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/phantomjs-polyfill-find/find-polyfill.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      `./${KARMA_ENTRY_FILE}`
    ],


    // list of files to exclude
    exclude: [],
    //plugins: [
    //  require('karma-webpack'),
    //  require('karma-jasmine'),
    //  require('karma-phantomjs-launcher'),
    //  require('karma-spec-reporter')
    //],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [KARMA_ENTRY_FILE]: ['webpack']
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: webpackConfig.resolve,
      plugins: webpackConfig.plugins
        .filter(plugin => !plugin.__KARMA_IGNORE__),
      module : {
        loaders: useCoverage ? webpackConfig.module.loaders.slice(1).concat({
          test   : /^((?!\.min).)*\.js$/,
          exclude: /node_modules/,
          loaders: [
            'ng-annotate',
            'babel'
          ]
        }) : webpackConfig.module.loaders,
        preLoaders: useCoverage && [{
          // instrument all js files except *.spec.js
          test   : /^(?!.*\.spec\.js$).*\.js$/,
          exclude: /node_modules/,
          loader : 'isparta'
        }]
      }
    },

    //webpackMiddleware: {
    //  noInfo: true
    //},

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: '',
      // create a single module that contains templates from all the files
      moduleName : 'templates'
    },

    junitReporter: {
      outputDir         : 'reports', // results will be saved as $outputDir/$browserName.xml
      outputFile        : 'tests.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite             : '', // suite will become the package name attribute in xml testsuite element
      useBrowserName    : false, // add browser name to report and classes names
      nameFormatter     : undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element,
      properties        : {} // key value pair of properties to add to the <properties> section of the report
    },


    coverageReporter: {
      dir      : 'reports',
      reporters: [{
        type  : 'html',
        subdir: 'coverage'
      }, {
        type  : 'cobertura',
        subdir: '.',
        file  : 'coverage.xml'
      }]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    //logLevel: config.LOG_INFO,
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
