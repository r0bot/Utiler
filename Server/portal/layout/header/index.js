/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (ngModule) {
    require('./config.js')(ngModule);
    require('./controller.js')(ngModule);
    require('./navigationDirective.js')(ngModule);
};