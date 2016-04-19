/*jslint node: true todo: true*/
'use strict';

var passport = require('passport');
var express = require('express');
var router = express.Router();

module.exports = function () {
    var AuthenticationController = require('./../../controllers/Authentication/AuthenticationController')();

    function login(req, res) {
        AuthenticationController.login(req, res, function (error, user) {
            if (error) {
                res.status(403).send(error);
                return;
            }
            res.json(user);
        });
    }

    function logout(req, res) {
        AuthenticationController.logout(req, res, function (error, result) {
            if (error) {
                res.status(403).send(error);
                return;
            }
            res.json(result);
        });
    }

    //Route to check if user is logged in
    router.get('/', AuthenticationController.isLoggedIn);
    //logout route
    router.post('/login', login);
    //logout route
    router.get('/logout', logout);
    //register route
    //TODO move this to callback structure too
    router.post('/register', AuthenticationController.signup);




    return router;
};