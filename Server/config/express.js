/*jslint node: true todo: true nomen: true*/
'use strict';

var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var swig = require('swig');
var morgan = require('morgan');
var config = require('./config');
var passport = require('passport');
var _ = require('lodash');

module.exports = function (sessionStore) {
    //Init app variable
    var app = express();
    app.locals.cssFiles = config.getCSSAssets();
    app.locals.jsFiles = config.getJavaScriptAssets();

    app.set('port', config.session);

    // Set views path and view engine
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(config.rootPath, 'server/views'));

    // Swig template engine configurations
    app.set('view cache', false);
    swig.setDefaults({
        cache: false,
        varControls: ['<%=', '%>']
    });

    // Setting static folder to serve
    app.use(express.static(path.join(config.rootPath, 'public')));

    // Setting static folder for images
    app.use(express.static(config.storageDir));


    app.use(favicon(path.join(config.rootPath, 'favicon.ico')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());

    // Configure session management. Extend the options with store. If not provided (null/undefined) express will fallback to default MemStore.
    app.use(session(_.assign(config.session, {store: sessionStore})));

    // Initialize passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Enable logger (morgan) and set where to save the logs
    var LOGS_PATH = config.rootPath + '/logs';

    if (!fs.existsSync(LOGS_PATH)) {
        fs.mkdirSync(LOGS_PATH);
    }

    var accessLogStream = fs.createWriteStream(LOGS_PATH + '/access.log', {flags: 'a'});

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else {
        app.use(morgan('combined', {
            stream: accessLogStream
        }));
    }

    //// Access-Control-Allow-Origin headers configuration
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Custom-Header, Content-Type, Authorization, Content-Length, X-Requested-With');

        if ('OPTIONS' === req.method) {
            res.send(200);
        } else {
            next();
        }
    });

    return app;
};