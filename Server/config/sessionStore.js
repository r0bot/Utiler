/*jslint node: true todo: true nomen: true*/
/*globals */
'use strict';

var config = require('./config');
var Sequelize = require('sequelize');
var session = require('express-session');

module.exports = function () {
    // initalize sequelize with session store
    var SequelizeStore = require('connect-session-sequelize')(session.Store);

// create database, ensure 'sqlite3' in your package.json
    var sequelize = new Sequelize(
        config.sessionStore.database,
        config.sessionStore.username,
        config.sessionStore.password,
        {
            "dialect": "sqlite",
            "storage": config.sessionStore.storagePath,
            logging: false
        }
    );

    var sessionStore = new SequelizeStore({
        db: sequelize
    });

    sessionStore.sync();

    return sessionStore;
};