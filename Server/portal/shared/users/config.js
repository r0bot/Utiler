/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    ngModule
        .config([
            '$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('profile', {
                        url: '/profile',
                        template: require('./views/profile.html'),
                        controller: 'ProfileController',
                        controllerAs: 'profileCtrl'
                        //resolve: RoutePermissionsProvider.isAuthenticated
                    })
                    .state('login', {
                        url: '/login',
                        template: require('./views/login.html'),
                        controller: 'LoginController',
                        controllerAs: 'loginCtrl'
                    })
                    .state('register', {
                        url: '/register',
                        template: require('./views/register.html'),
                        controller: 'RegisterController',
                        controllerAs: 'registerCtrl',
                        abstract: true
                    });
            }
        ]);
};