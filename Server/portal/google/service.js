/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    ngModule
        .factory('GoogleApiService', [
            '$rootScope', '$http', '$q',
            function ($rootScope, $http, $q) {

                function obtainRedirectUrl() {
                    var deferred = $q.defer();

                    var req = {
                        method: 'GET',
                        url: '/api/google/getAuthenticationUrl'
                    };

                    $http(req)
                        .success(function (data, status, headers, config) {
                            console.log('Redirect URL: ', data);
                            deferred.resolve(data);
                        })
                        .error(function (data, status, headers, config) {
                            // Handle error correctly
                            console.error('Error: ', data.message);

                            deferred.reject();
                        });

                    return deferred.promise;
                }

                return {
                    obtainRedirectUrl: obtainRedirectUrl
                };
            }
        ]);
};
