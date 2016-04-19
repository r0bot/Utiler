/*jslint node: true todo: true nomen: true*/
'use strict';

var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    /*jslint unparam: true*/
    res.render('index', {
        title: 'Bare Bones Server'
    });
});

router.get('/docs', function (req, res) {
    /*jslint unparam: true*/
    res.render('documentation', {
        title: 'Documentation Search'
    });
});

module.exports = router;