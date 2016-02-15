"use strict";

var request = require('request');
var fs = require('fs');
var async = require('async');
var _ = require("underscore");
var config = require('./config.json');


var recurseCallFunctions = false;
var counters = {
    numberOfEntriesGenerated: 0
};


var numberOfExecutedFunction = 0;
var numberOfFailedExecutions = 0;
var averageExecutionTime = 0;

var insertDataInType = function() {
    console.log("Initiating call");
    var options = {
        method: 'GET',
        url: 'https://testtap.telerik.com/bs-api/v1/no44BxFoGN6T49PU/dbo_Products?take=100000',
        agentOptions: {
            maxSockets: 1000
        }
    };
    var executionStartTime = _.now();

    function callback(error, response, body) {
        var executionEndTime = _.now();
        averageExecutionTime = Math.round(((executionEndTime - executionStartTime) + averageExecutionTime) / 2);

        numberOfExecutedFunction++;

        console.log("Call completed...");
        console.log("Request Number: "+ numberOfExecutedFunction);
        console.log("Status Code: " + response.statusCode);

        if (!error && response) {
            if(!response.statusCode || response.statusCode != 200){
                numberOfFailedExecutions++;
            }
        }else{
            numberOfFailedExecutions++;
            var response = JSON.parse(body);
            console.log("Error: " + response.message);
        }
        console.log("Failed Executions: ", numberOfFailedExecutions);
        console.log("Execution Time: ", Math.round((executionEndTime - executionStartTime) / 2));
        console.log("=================================================================================");

        async.setImmediate(function(){
            afterCallComplete.call();
        });
    }
    request(options, callback);
};

var generateDataForField = function(){
    counters.numberOfEntriesGenerated++;
    var fieldName = config.testTypeFieldName;
    var returnObj = {
        'username':'John ' + counters.numberOfEntriesGenerated,
        'password':'123123'
    };

    return returnObj;
}

var afterCallComplete = function() {
    if (recurseCallFunctions && numberOfExecutedFunction < 10000) {
        insertDataInType.call();
    };
};

var makeParallelCallsAndMigrate = function(numberOfParallelFunctions){
    var functionsArray = [];

    _.times(numberOfParallelFunctions, function(n){
        var func = function() {
            async.setImmediate(function () {
                insertDataInType.call();
            });
        }
        functionsArray.push(func);
    });

    async.parallel(functionsArray);
};

//migrateApp();
makeParallelCallsAndMigrate(10);




