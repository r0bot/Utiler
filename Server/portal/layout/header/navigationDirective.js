/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    ngModule
        .directive('headerNavigation', function headerNavigation() {
            return {
                restrict: 'E',
                template: require('./header-navigation.html'),
                controller: /*@ngInject*/ 'HeaderController',
                controllerAs: 'headerCtrl'
            };
        });
};