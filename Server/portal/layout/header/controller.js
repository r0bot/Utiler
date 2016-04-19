/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    ngModule
        .controller('HeaderController', ['$scope', '$state', 'Authentication', 'Identity',
            function HeaderController($scope, $state, Authentication, Identity) {
                var self = this;
                self.brand = "nodeBareBones";

                //watch the user in identity for changes, so it can show hide links
                $scope.$watch(function () {
                        return Identity.currentUser;
                    },
                    function (currentUser) {
                        if (currentUser) {
                            self.isUserLoggedin = (currentUser.displayName) ? true : false;
                            self.isUserAdmin = (currentUser.roles && currentUser.roles.indexOf('admin')) ? true : false;
                        }
                    }
                );

                //Call function to signout the user
                self.logout = function () {
                    Authentication.logout();
                };
            }
        ]);
};
