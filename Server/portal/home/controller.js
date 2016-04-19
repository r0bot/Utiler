/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    ngModule
        .controller('HomeController', ['$scope', '$state',
            function HomeController($scope, $state, FavoriteUsersResource) {
                var self = this;
            }
        ]);
};