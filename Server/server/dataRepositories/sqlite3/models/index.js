/**
 * This is helpful if you want to require('/server/models') all at a time and use them together for some reason. 
 * 
 */

var fs = require('fs');

var data = {};

var modelsDataFiles = fs.readdirSync(__dirname);
modelsDataFiles.forEach(function (file) {
    if (file !== 'index.js') {
        var modelData = require('./' + file);
        data[modelData.name] = modelData.data;
    }
});

module.exports = data;