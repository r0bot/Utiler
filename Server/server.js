'use strict';

//This must always be the first thing called when initiating the server as it sets needed root properties creates folder and so on.
global.appConfig = require('./config/config');

//Init mongooose
require('./config/mongoose');

//Config passport and add strategies to it
require('./config/passport')();

var sessionStore = require('./config/sessionStore')();

//Config express
var app = require('./config/express')(sessionStore);
//Config the socketIO server
var socketIo = require('./config/express')(app, sessionStore);

//Start socket io
socketIo.listen(global.appConfig.socketIO.port);

//Add the routes to the app
require('./config/routes')(app);

//Init the server
app.listen(global.appConfig.port, global.appConfig.ip, function () {
    console.log('====================== Configuration =========================');
    console.log('Environment: ', global.appConfig.environment);
    console.log('Port: ', global.appConfig.port);
    console.log('IP: ', global.appConfig.ip);
    console.log('Database connection string: ', global.appConfig.db);
    console.log('==============================================================');
});

module.exports = app;
