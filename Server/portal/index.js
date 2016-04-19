/*jslint node: true todo: true nomen: true*/
'use strict';
require('lodash');
//Register application module
var application = require('./app');

// Register modules.
require('./layout')(application);
require('./shared')(application);
require('./home')(application);
require('./google')(application);

