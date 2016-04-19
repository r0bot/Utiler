/*jslint node: true todo: true nomen: true*/
/*globals document, window, modules*/
'use strict';

var angular = require('angular');

module.exports = (function () {
    // Init app configuration options
    var applicationModuleName = 'nodeBareBones',
        applicationModuleVendorDependencies = [
            require('angular-ui-router'),
            require('angular-cookies'),
            require('angular-messages'),
            require('angular-material')
        ],
        ngApp = angular.module(applicationModuleName, applicationModuleVendorDependencies),
    //Function to register modules in the angular app
        registerModule = function (moduleName, dependencies) {
            // Create angular module
            var module = angular.module(moduleName, dependencies || []);
            // Add the module to the AngularJS configuration file
            ngApp.requires.push(moduleName);
            return module;
        };


//Start by defining the main module and adding the module dependencies


// Setting HTML5 Location Mode
    ngApp.config(
        [
            '$locationProvider',
            function ($locationProvider) {
                $locationProvider.hashPrefix('!');
                //$locationProvider.html5Mode(true);
            }
        ]
    );

//Then define the init function for starting up the application
    angular.element(document).ready(function () {
        //Fixing facebook bug with redirect
        if (window.location.hash === '#_=_') {
            window.location.hash = '#!';
        }
        //Then init the app
        angular.bootstrap(document, [applicationModuleName]);

    });

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
}());

