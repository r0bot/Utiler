var mongoose = require('mongoose');
var config = require('./config');

module.exports = (function () {
    mongoose.connect(config.db);
    mongoose.connection
        .on('error', function () {
            console.log('Error occurred with the db connection!');
        })
        .once('open', function () {
            console.log('DB connection opened!');
        });
})();