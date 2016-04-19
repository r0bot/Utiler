/*jslint node: true todo: true*/
'use strict';

var express = require('express');
var router = express.Router();

module.exports = function () {
    var GoogleApiController = require('./../../controllers/GoogleApi/GoogleApiController')();

    function oAuth2Callback(req, res) {
        /*jslint unparam: true*/
        GoogleApiController.oAuth2Callback(req.query.code, function (err, tokens) {
            res.redirect('/')
        });
    };

    function buildOAuth2ReturnUrl(req, res){
        res.json(GoogleApiController.buildOAuth2ReturnUrl());
    }

    router.route('/googleOAuth2Callback')
        .get(oAuth2Callback);

    router.route('/getAuthenticationUrl')
        .get(buildOAuth2ReturnUrl);

    return router;
};