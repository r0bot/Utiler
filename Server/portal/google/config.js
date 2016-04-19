/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    ngModule
        .config([
            '$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider) {

                $stateProvider
                    .state('google', {
                        url: '/google',
                        template: require('./google.html'),
                        controller: 'GoogleController',
                        controllerAs: 'googleCtrl'
                    });
            }
        ]);
};