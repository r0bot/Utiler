/**
 * Created by r0bot on 2/25/2016.
 */

/*jslint node: true todo: true nomen: true*/
/*globals modules*/
'use strict';

module.exports = function (application) {
    var ngModule = application.registerModule('layout');
    require('./header')(ngModule);
};
