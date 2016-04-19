'use strict';

var config = require('./config'),
    path = require('path'),
    passport = require('passport');

module.exports = function (data) {

	var UsersController = require('./../server/controllers/Users/UsersController')();

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		UsersController.getById(id, function (error, user) {
			done(error, user);
		});
	});

    //Initialize the defined login strategies
    config.getGlobbedFiles('./config/loginStrategies/**/*.js').forEach(function(strategy) {
        require(path.resolve(strategy))();
    });
};