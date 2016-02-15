"use strict";

var request = require('request');
var fs = require('fs');
var async = require('async');
var _ = require("underscore");


module.exports = function (config) {
    if (!config.bsApiUrl) {
        throw new Error('BS API URL is mandatory to be provided to the module.');
    }
    var bsApiUrl = config.bsApiUrl;

    function createApp(appData, done) {
        if (!appData.tapAccountId) {
            done(new Error('Tap account ID is mandatory to be provided to the module.'));
            return;
        }
        var tapAccountID = appData.tapAccountId;

        var options = {
            method: 'POST',
            url: 'http://' + bsApiUrl + '/Metadata/Accounts/' + tapAccountID + "/Applications",
            json: true,
            headers:{
                Authorization : appData.authHeader
            },
            body: _generateCreateAppData(appData)
        };
        request(options, function(error, response) {
            if (!error && response) {
                if (response.statusCode) {
                    console.log("Status Code: " + response.statusCode);
                    if (response.statusCode != 200 && response.statusCode != 201) {
                        return done(new Error('Failed to create app!'), response);
                    }
                    return done(null, response);
                } else {
                    return done(new Error('Request failed!'), response);
                }
            } else {
                return done(error);
            }
        });

    }

    function _generateCreateAppData(appData) {
        return {
            TemplateNames: appData.TemplateNames || null,
            IsSample: appData.IsSample || false,
            Settings: appData.Settings || {},
            Name: appData.Name || 'DefaultName',
            SkipFeatureCheck: appData.SkipFeatureCheck || true,
            Type: appData.Type || null,
            Description: appData.Description || 'Default Description.'
        };
    }

    function addContentTypeToApp(contentTypeData, done) {
        if (!contentTypeData.appId) {
            done(new Error('App ID must be provided.'));
        }
        if (!contentTypeData.Name) {
            done(new Error('Name must be provided.'));
        }
        if (!contentTypeData.Title) {
            done(new Error('Title must be provided.'));
        }


        var appId = config.tapAccountId;
        var options = {
            method: 'POST',
            url: 'http://' + bsApiUrl + '/Metadata/Applications/' + appId + '/Types',
            json: true,
            body: {
                Name: contentTypeData.Name,
                Title: contentTypeData.Title
            }
        };

        request(options, function(error, response) {
            if (!error && response) {
                if (response.statusCode) {
                    console.log("Status Code: " + response.statusCode);
                    if (response.statusCode != 200 && response.statusCode != 201) {
                        return done(null, response);
                    }
                } else {
                    return done(new Error('Request failed!'), response);
                }
            } else {
                return done(error);
            }
        });
    }

    function obtainAuthorization(done){
        var options = {
            method: 'POST',
            url: config.identityServiceUrl,
            json: true,
            headers: {
                Authorization: config.identityServiceAuthHeaderValue
            },
            strictSSL: false,
            body:{
                username: config.username,
                password: config.password,
                grant_type: 'password'
            }
        };

        request(options, function(error, response, body) {
            if(error){
                return done(error);
            }

            done(null, body);
        });
    }

    return {
        createApp: createApp,
        addContentTypeToApp: addContentTypeToApp,
        obtainAuthorization: obtainAuthorization
    };

};
