config = require('./config.json');
var request = require('request');


function obtainAuthorization(){
    var appId = config.appID;
    var bsApiUrl = config.bsApiUrl;
    var options = {
        method: 'POST',
        url: config.identityServiceUrl,
        json: true,
        headers: {
            Authorization: ' Basic dXJpJTNBYXBwc2hlbGw6MWI0ODA0NTI2YWY1OWM4M2RkOGE2MTI1MjRiNTQwNmM='
        },
        strictSSL: false,
        body:{
            username: 'zemisi@telerik.com',
            password: '123123',
            grant_type: 'password'
        }
    };

    request(options, function(error, response, body) {
        console.log('ss');
    });
}


obtainAuthorization();