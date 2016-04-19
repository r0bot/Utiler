/**
 * This is helpful if you want to require('/server/repositories') all at a time and use them together for some reason. 
 * For example if you want to use Unit of Work design pattern and use all the repositories as a whole data module.
 */

var fs = require('fs');

var data = {};

var modelsDataFiles = fs.readdirSync(__dirname + '/repositories');
modelsDataFiles.forEach(function (file) {
    var modelData = require('./repositories/' + file);
    data[modelData.name] = modelData.data;
});

module.exports = data;