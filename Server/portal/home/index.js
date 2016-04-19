/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (application) {
    var ngModule = application.registerModule('home');
    require('./config')(ngModule);
    require('./controller')(ngModule);
};
