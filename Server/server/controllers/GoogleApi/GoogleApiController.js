/*jslint node: true todo: true nomen: true*/
'use strict';
var googleApiConfig = global.appConfig.googleApiCredentials;
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

module.exports = function () {
    var oauth2Client = new OAuth2(googleApiConfig.clientId, googleApiConfig.clientSecret, googleApiConfig.redirectUrl);

    var buildOAuth2ReturnUrl = function(){
        // generate a url that asks permissions for Google+ and Google Calendar scopes
        var scopes = [
            'https://spreadsheets.google.com/feeds/'
        ];

        var url = oauth2Client.generateAuthUrl({
            access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
            scope: scopes
        });
        return url;
    };

    var oAuth2Callback = function (code, callback){
        oauth2Client.getToken(code, function(err, tokens) {
            if(err){
                return callback(err);
            }
            console.log(tokens);
            callback(null, tokens);
        });
    }

    return {
        buildOAuth2ReturnUrl: buildOAuth2ReturnUrl,
        oAuth2Callback: oAuth2Callback
    };
};