/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    ngModule
        .service('Identity', [
            '$cookieStore',
            function ($cookieStore) {
                var identityService = {};

                identityService.cookieStorageUserKey = 'currentApplicationUser';

                identityService.currentUser = {};

                identityService.refreshUserFromCookie = function refreshUser() {
                    var savedUser = $cookieStore.get(identityService.cookieStorageUserKey);
                    if (savedUser) {
                        return identityService.currentUser = savedUser;
                    }

                    identityService.currentUser = {};
                };

                identityService.getCurrentUser = function getCurrentUser() {
                    var savedUser = $cookieStore.get(identityService.cookieStorageUserKey);
                    if (savedUser) {
                        return savedUser;
                    }

                    return identityService.currentUser;
                };

                identityService.setCurrentUser = function setCurrentUser(user) {
                    if (user) {
                        $cookieStore.put(identityService.cookieStorageUserKey, user);
                    } else {
                        $cookieStore.remove(identityService.cookieStorageUserKey);
                    }

                    identityService.currentUser = user;
                };

                identityService.isAuthenticated = function isAuthenticated() {
                    return !!identityService.getCurrentUser();
                };

                identityService.isAdmin = function isAdmin() {
                    return identityService.isInRole('admin');
                };

                identityService.isInRole = function isInRole(role) {
                    var user = identityService.getCurrentUser(),
                        inRole = false,
                        i = 0,
                        userRole = null;

                    if (user) {
                        while (user.roles.length > i) {
                            userRole = user.roles[i];
                            if (userRole === role) {
                                inRole = true;
                                break;
                            }
                            i++;
                        }
                    }

                    return inRole;
                };

                return identityService;
            }
        ]);
};

