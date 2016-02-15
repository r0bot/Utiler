"use strict";

var request = require('request');
var fs = require('fs');
var async = require('async');
var _ = require("underscore");
var config = require('./config.json');


var recurseCallFunctions = true;
var counters = {
    numberOfEntriesGenerated: 0
};


var numberOfExecutedFunction = 0;
var numberOfFailedExecutions = 0;
var averageExecutionTime = 0;

var isAppMigrating = false;

var insertDataInType = function() {
    var options = {
        method: 'POST',
        url: 'http://' + config.bsApiUrl + '/' +  config.appID + "/" +  config.testTypeName,
        json:true,
        headers: {
            'Authorization': 'MasterKey ' + config.masterKey
        },
        agentOptions: {
            maxSockets: 1000
        },
        body : generateDataForField()
    };
    var executionStartTime = _.now();
	
    function callback(error, response, body) {
        var executionEndTime = _.now();
        averageExecutionTime = Math.round(((executionEndTime - executionStartTime) + averageExecutionTime) / 2);

        numberOfExecutedFunction++;


        if(isAppMigrating){
            console.log('Call while app is migrating..');
            console.log("Started New Call...");
            console.log("Request Number: "+ numberOfExecutedFunction);
        }

        if (!error && response) {
            if(response.statusCode){
                //console.log("Status Code: " + response.statusCode);
                if (response.statusCode != 200 && response.statusCode != 201){
                    numberOfFailedExecutions++;
                }
            }else{
                numberOfFailedExecutions++;
            }

        }else{
            numberOfFailedExecutions++;
            console.log("Error: " + body);
        }
        if(isAppMigrating) {
            console.log("Failed Executions: ", numberOfFailedExecutions);
            console.log("Execution Time: ", averageExecutionTime);
            console.log("=================================================================================");
        }
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
        'testField': "test field entry number " + counters.numberOfEntriesGenerated
    };

    return returnObj;
}

var afterCallComplete = function() {
    if (recurseCallFunctions && numberOfExecutedFunction < 1000) {
        insertDataInType.call();
        if(numberOfExecutedFunction == 200){
            migrateApp();
        }
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

    async.parallel(functionsArray, function(){
        console.log("Failed Executions: ", numberOfFailedExecutions);
        console.log("Execution Time: ", averageExecutionTime);
        console.log("=================================================================================");
    });
};

var migrateApp = function(){
    var options = {
        method: 'POST',
        url: 'http://'+ config.bsApiUrl + "/System/MigrateAppToNewDb",
        json:true,
        headers: {
            'Authorization': 'MasterKey ' + config.masterKey
        },
        agentOptions: {
            maxSockets: 1000
        },
        body : {
            "apiKey": config.appID,
            "serverGroupName": 'Migrated',
            "sourceHost": 'localhost:27017',
            "targetHost": 'bs-mongodb-1.dev.tap.internal:37017',
            "stopApp": ""
        }
    };

    var executionStartTime = _.now();
    isAppMigrating = true;
    function callback(error, response, body) {
        var executionEndTime = _.now();

        if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
            console.log("App migrated successfully!");
        }else{
            console.log("Error migrating app: " + response.message);
        }
        console.log("It took : " + Math.round(executionEndTime - executionStartTime));
        console.log("=================================================================================");
        isAppMigrating =false;
    }
    request(options, callback);

}
//migrateApp();
makeParallelCallsAndMigrate(5);




