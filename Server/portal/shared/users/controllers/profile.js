/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    ngModule
        .controller('ProfileController', [
            '$http', 'Identity',
            function ProfileController($http, Identity) {
                var self = this;
                var baseUrl = 'http://localhost:3310';

                self.user = Identity.getCurrentUser();

                self.updateProfile = function () {
                    var id = self.user.id;

                    var request = {
                        method: 'PUT',
                        url: baseUrl + '/api/users/' + id,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        transformRequest: function (obj) {
                            var str = [];
                            for (var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data: self.user
                    };

                    $http(request)
                        .success(function (data, status, headers, config) {
                            console.log('Success: ', data);

                            Identity.setCurrentUser(data);
                            self.user = data;
                        })
                        .error(function (data, status, headers, config) {
                            console.log('Error: ', data);
                        });
                };
            }
        ]);
};