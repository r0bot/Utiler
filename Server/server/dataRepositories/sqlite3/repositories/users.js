var bluebird = require('bluebird');
var mongoose = require('mongoose');

var User = require('./../../models/User/User');

function getAll () {
    var deferred = bluebird.defer();

    User
        .find({}, function (error, users) {
            if (error) {
                deferred.reject(error);
            }

            deferred.resolve(users);
        });

    return deferred.promise;
}

function getByTwitterID (id) {
    var deferred = bluebird.defer();

    User
        .findOne({twitterID:id}, function (error, user) {
            if (error) {
                deferred.reject(error);
            }

            deferred.resolve(user);
        });

    return deferred.promise;
}

function getById (id) {
    var deferred = bluebird.defer();

    User
        .findById(id, function (error, user) {
            if (error) {
                deferred.reject(error);
            }

            deferred.resolve(user);
        });

    return deferred.promise;
}

function createUser (params) {
    var deferred = bluebird.defer();
    var user = new User(params);

    user.save(function (error, savedUser) {
        if (error) {
            deferred.reject(error);
            return;
        }

        deferred.resolve(savedUser);
    });

    return deferred.promise;
}

function updateById (id, updatesObject) {
    var deferred = bluebird.defer();

    User.findByIdAndUpdate(id, updatesObject, function (error, updatedUser) {
        if (error) {
            deferred.reject(error);
            return deferred.promise;
        }

        deferred.resolve(updatedUser);
    });

    return deferred.promise;
}

function removeById (id) {
    var deferred = bluebird.defer();

    return deferred.promise;
}

function removeAll () {
    //var deferred = bluebird.defer();

    //return deferred.promise;
}

module.exports = {
    name: 'users',
    data: {
        getAll: getAll,
        getById: getById,
        getByTwitterID: getByTwitterID,
        createUser: createUser,
        updateById: updateById,
        removeById: removeById,
        removeAll: removeAll
    }
};