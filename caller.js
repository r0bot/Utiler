"use strict";

var request = require('request');
var fs = require('fs');
var async = require('async');
var _ = require("underscore");

var recurseCallFunctions = true;




var numberOfExecutedFunction = 0;
var numberOfFailedExecutions = 0;
var averageExecutionTime = 0;

var makeCall = function() {
    var options = {
        url: 'http://bs-api-1.dev2.tap.internal:8090/v1/batch',
        headers: {
            'Authorization': 'MasterKey kI4QlgFTVVT0qUl1VaCI7SrOsUopHvqg'
        },
        agentOptions: {
            maxSockets: 1000
        }
    };
     var executionStartTime = _.now();
    function callback(error, response, body) {
        var executionEndTime = _.now();
        averageExecutionTime = Math.round(((executionEndTime - executionStartTime) + averageExecutionTime) / 2);

        numberOfExecutedFunction++;

        console.log("Started New Call...");
        console.log("Request Number: "+ numberOfExecutedFunction);
        console.log("Status Code: " + response.statusCode);

        if (!error && response.statusCode == 200) {

        }else{
            numberOfFailedExecutions++;
            var response = JSON.parse(body);
            console.log("Error: " + response.message);
        }
        console.log("Failed Executions: ", numberOfFailedExecutions);
        console.log("Execution Time: ", averageExecutionTime);
        console.log("=================================================================================");

        async.setImmediate(function(){
            afterCallComplete.call();
        });
    }
    request(options, callback);
};

var afterCallComplete = function() {
    if (recurseCallFunctions) {
        var executeAfter = _.random(100, 10000);
        setTimeout(function () {
            makeCall.call();
        }, executeAfter);
    };
};

var downloadFile = function(){
    var fileName = 'pictures.zip';
    request({
        url: "http://bs-api-1.dev2.tap.internal:8090/v1/batch", //URL to hit
        //qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'POST',
        //Lets post the following key/values as form
        json: {
            "url": "https://bs3.cdn.telerik.com/v1/aif9c4vyeqz15qij/36f71cf0-a015-11e5-81a3-3f954e72d85b",
            "operations": [{
                "operation": "resize=h:480,w:320,fill:cover",
                "fileName": "App_Resources/iOS/Default.png"
            }]
        }
    })
    .pipe(fs.createWriteStream(fileName))
    .on('close', function(){
        console.log('File downloaded!');
    });
}

var makeParallelCalls = function(numberOfParallelFunctions){
    var functionsArray = [];

    _.times(numberOfParallelFunctions, function(n){
        var func = function() {
            async.setImmediate(function () {
                makeCall.call();
            });
        }
        functionsArray.push(func);
    });

    async.parallel(functionsArray);
};

//makeParallelCalls(50);
downloadFile();




