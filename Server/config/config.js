/*jslint node: true todo: true nomen: true*/
'use strict';

var _ = require('lodash'),
    glob = require('glob');

//Get the environment
var environment = process.env.NODE_ENV || 'development';

//Extend the environment config with the below
var config = _.extend(require('./environments/' + environment));

//Define the assets that will be loaded in the swig layout template.
var ASSETS = {
    css: [
        'public/assets/css/*.css'
    ],
    js: [
        'public/dist/bundle.js'
    ],
    tests: [
        //'/assets/bower_components/angular-mocks/angular-mocks.js',
        'public/app/modules/*/tests/*.js',
        'public/app/core/*/tests/*.js'
    ]
};

config.environment = environment;

config.getGlobbedFiles = function (globPatterns, removeRoot) {
    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i'),
    // The output array
        output = [],
        files = null;

    // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, config.getGlobbedFiles(globPattern, removeRoot));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            files = glob.sync(globPatterns);
            if (removeRoot) {
                files = files.map(function (file) {
                    return file.replace(removeRoot, '');
                });
            }
            output = _.union(output, files);
        }
    }

    return output;
};

config.getJavaScriptAssets = function (includeTests) {
    var output = config.getGlobbedFiles(ASSETS.js, 'public/');

    // To include tests
    if (includeTests) {
        output = _.union(output, config.getGlobbedFiles(ASSETS.tests));
    }

    return output;
};

config.getCSSAssets = function () {
    var output = config.getGlobbedFiles(ASSETS.css, 'public/');
    return output;
};

module.exports = config;