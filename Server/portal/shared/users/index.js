/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    require('./config')(ngModule);
    require('./services/identity.js')(ngModule);
    require('./services/authentication.js')(ngModule);
    require('./controllers/login.js')(ngModule);
    require('./controllers/profile.js')(ngModule);
    require('./controllers/register.js')(ngModule);
};