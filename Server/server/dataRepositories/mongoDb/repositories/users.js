'use strict';
var bluebird = require('bluebird');

var User = require('./../models/User/User');

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

function createUser (userData, done) {

    var newUser = new User({
        username: userData.username,
        provider: userData.provider,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        firstName: userData.firstName,
        lastName: userData.lastName,
        displayName: userData.firstName + ' ' + userData.lastName,
        city: userData.city,
        country: userData.country,
        postalCode: userData.postalCode,
        address: userData.address
    });

    newUser.password = newUser.generateHash(password);

    if (userData.roles) {
        newUser.roles = userData.roles;
    }

    newUser.save(function (error) {
        if (error) {
            done(error);
        }

        return done(null, newUser, { message: 'Sign up succeeded!' });
    });
}

function find (searchCriteria, searchOptions) {
    var deferred = bluebird.defer();

    if(searchOptions.singleResult){
        User.findOne(searchCriteria, function (error, user) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(user);
        });
    }else{
        User.find(searchCriteria, function (error, user) {
            if (error) {
                deferred.reject(error);
                return deferred.promise;
            }

            deferred.resolve(user);
        });
    }

    return deferred.promise;
}

function findOne (searchCriteria) {
    var deferred = bluebird.defer();



    return deferred.promise;
}

module.exports = {
    name: 'users',
    data: {
        find: find,
        getAll: getAll,
        getById: getById,
        getByTwitterID: getByTwitterID,
        createUser: createUser,
        updateById: updateById,
        removeById: removeById,
        removeAll: removeAll
    }
};