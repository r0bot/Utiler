/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (application) {
    var ngModule = application.registerModule('google');
    require('./config')(ngModule);
    require('./service')(ngModule);
    require('./controller')(ngModule);
};
