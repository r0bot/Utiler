var config = require('./config');
var stdio = require('stdio');
var async = require('async');
var uuid = require('uuid');
var _ = require('underscore');
var lodash = require('lodash');


var appModule = require('./modules/appModule.js')(config);


var scriptOptions = stdio.getopt({
    'nmbrOfApps': {key: "n", description: 'the number of apps to be created.', args: 1, mandatory: true},
    'parallel': {key: "p", description: 'Create the apps in parallel flag.'},
});

function init() {
    var functionsArray = [];
    appModule.obtainAuthorization(function(err, authTokenObject){
        if(err){
            return console.log('Error', err);
        }
        if(!authTokenObject){
            return console.log('No auth Token: ', authTokenObject);
        }

        lodash.times(lodash.toNumber(scriptOptions.nmbrOfApps), function (n) {
            var func = function (callback) {
                var appData = generateAppData(authTokenObject);
                async.setImmediate(function () {
                    console.log('Creating app..');
                    appModule.createApp(appData, function (err, result) {
                        if (err) {
                            console.log('Problem creating app: ' + err);
                            callback('Problem creating app: ' + err);
                            return;
                        }

                        console.log('App created successfully!');
                        callback();
                    })
                });
            };
            functionsArray.push(func);
        });

        if (scriptOptions.parallel) {
            async.parallel(functionsArray, function(err, result){

                console.log();
            });
        } else {
            async.series(functionsArray, function(err, result){

                console.log();
            });
        }
    });

}


function generateAppData(authorizationObject) {
    var appUUID = uuid.v1();
    return {
        authHeader: lodash.capitalize(authorizationObject.token_type) + ' ' + authorizationObject.access_token,
        tapAccountId : config.tapAccountId,
        TemplateNames: null,
        IsSample: false,
        Settings: {},
        Name: 'TestApp' + appUUID,
        SkipFeatureCheck: true,
        Type: null,
        Description: 'TestApp number ' + appUUID + ' randomly generated description.'
    };
}

init();