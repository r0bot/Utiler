/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    ngModule
        .controller('LoginController', [
            '$scope', '$state', 'Authentication', 'Identity',
            function LoginController($scope, $state, Authentication, Identity) {
                var self = this;

                self.identity = Identity;
                self.user = {};
                self.loginError = '';

                self.login = function () {
                    Authentication.login(self.user)
                        .then(function () {
                            $state.go('home');
                        }, function (error) {
                            if (error === 'No user found!') {
                                self.loginError = 'Wrong username or password';
                            }
                        });
                };

                self.isEmpty = function (fieldName) {
                    var field;

                    if (!fieldName) {
                        return false;
                    }

                    if (self.user[fieldName]) {
                        field = self.user[fieldName];
                    } else {
                        field = $scope.loginForm[fieldName].$viewValue;
                    }

                    if (!field || field.length === 0) {
                        return true;
                    }

                    return false;
                };
            }
        ]);
};