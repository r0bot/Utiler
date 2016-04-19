/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    ngModule
        .config([
            '$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider) {

                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('home', {
                        url: '/',
                        template: require('./home.html'),
                        controller: 'HomeController',
                        controllerAs: 'homeCtrl'
                    });
            }
        ])
        .run([
            '$rootScope', '$state',
            function ($rootScope, $state) {

                $rootScope.$on('$stateChangeError', function () {

                    // If this event is raised, then some of the resolve functions in the states definitions
                    // return false, i.e the user does not have permissions to access this state

                    $state.go('login');
                });
            }
        ]);
};