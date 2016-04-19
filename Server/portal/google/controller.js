/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    ngModule
        .controller('GoogleController', ['$scope', '$window', '$state', 'GoogleApiService',
            function GoogleController($scope, $window, $state, GoogleApiService) {
                var self = this;
                self.redirectToAuthenticationUrl = function () {
                    GoogleApiService.obtainRedirectUrl().then(
                        function (data) {
                            console.log(data);
                            // $window
                            $window.location.href = data;
                        },
                        function(error){
                            alert(error);
                        }
                    )
                }
            }
        ]);
};