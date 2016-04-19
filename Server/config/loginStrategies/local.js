/*jslint node: true todo: true nomen: true*/
'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var usersController = require('./../../server/controllers/Users/UsersController')();

module.exports = function () {
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        var userData = req.body;
        console.log('Registering user: ', userData);

        process.nextTick(function () {
            usersController.find({'username': username}, {singleResult: true}, function (error, user) {
                if (error) {
                    return done(error);
                }

                if (user) {
                    return done(null, false, {message: 'Username already exist!'});
                }

                userData.username = username;
                userData.provider = 'local';

                usersController.createUser(userData, function (error, createdUser) {
                    if (error) {
                        throw error;
                    }
                    return done(null, createdUser, {message: 'Sign up succeeded!'});
                });

            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        /*jslint unparam: true*/
        usersController.validateUserPassword({'username': username, 'password': password}, function (error, result) {
            if (error) {
                return done({message: error.message});
            }

            if (result.isPasswordValid) {
                return done({message: 'Invalid password!'});
            }

            return done(false, result.user, {message: 'Login succeeded!'});
        });
    }));
};