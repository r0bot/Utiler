/*jslint node: true todo: true*/
'use strict';

var userUtils = require('./../../utilities/userUtilities.js');
var lodash = require('lodash');
var usersConfiguration = global.appConfig.controllersConfig.users;

module.exports = function () {
    var dataRepository = require('./../../dataRepositories/' + usersConfiguration.dataRepository.name);
    //Check if data repository has user defined
    if (!dataRepository.users) {
        throw new Error('Data repository ' + usersConfiguration.dataRepository.name + ' has no users defined in it.');
    }

    function getAll(done) {
        dataRepository.users.getAll()
            .then(function (users) {
                var publicUsers = [];
                lodash.each(users, function (user) {
                    publicUsers.push(userUtils.getPublicUser(user));
                });
                done(null, publicUsers);
            }, function (error) {
                done(error);
            });
    }

    function getById(id, done) {
        dataRepository.users.getById(id)
            .then(function (user) {
                done(null, userUtils.getPublicUser(user));
            }, function (error) {
                done(error);
            });
    }

    function updateById(params, done) {
        if (!params.id) {
            return done(new Error('No user ID provided.'));
        }

        if (!params.propertiesToUpdate) {
            return done(new Error('No properties to update provided.'));
        }
        var updatesObject = params.propertiesToUpdate,
            id = params.id;

        dataRepository.users.updateById(id, updatesObject)
            .then(function (updatedUser) {
                done(null, userUtils.getPublicUser(updatedUser));
            }, function (error) {
                done(error);
            });
    }

    function find(searchCriteria, searchOptions, done) {
        //TODO validate search criteria and options
        dataRepository.users.find(searchCriteria, searchOptions)
            .then(function (users) {
                done(null, userUtils.getPublicUser(users));
            }, function (error) {
                done(error);
            });
    }

    function createUser(userData, done) {
        //TODO validate userData properties
        dataRepository.users.create(userData)
            .then(function (user) {
                done(null, userUtils.getPublicUser(user));
            }, function (error) {
                done(error);
            });
    }

    function validateUserPassword(params, done) {
        // to do parameters validation
        if (!params.username) {
            return done(new Error('No username specified!'));
        }
        if (!params.password) {
            return done(new Error('No password provided!'));
        }


        dataRepository.users.find({username: params.username}, {singleResult: true})
            .then(function (user) {
                userUtils.validateUserPasswordByModel(user, function (error, isPasswordValid) {
                    if (error) {
                        done(error);
                    }
                    done(null, {user: userUtils.getPublicUser(user), isPasswordValid: isPasswordValid});
                });
            }, function (error) {
                done(error);
            });
    }

    return {
        find: find,
        getAll: getAll,
        getById: getById,
        createUser: createUser,
        updateById: updateById,
        validateUserPassword: validateUserPassword
    };
};

