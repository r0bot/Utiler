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

var insertDataInType = function() {
    var options = {
        method: 'POST',
        url: 'http://'+ config.bsApiUrl +  config.appID + "/" +  config.testTypeName,
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

        console.log("Started New Call...");
        console.log("Request Number: "+ numberOfExecutedFunction);
        console.log("Status Code: " + response.statusCode);

        if (!error && response) {

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

var generateDataForField = function(){
    counters.numberOfEntriesGenerated++;
    var fieldName = config.testTypeFieldName;
    var returnObj = {
        'testField': "test field entry number " + counters.numberOfEntriesGenerated
    };

    return returnObj;
}

var afterCallComplete = function() {
    if (recurseCallFunctions && numberOfExecutedFunction < 10000) {
        insertDataInType.call();
        if(numberOfExecutedFunction == 5000){
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

    async.parallel(functionsArray);
};

var migrateApp = function(){
    var options = {
        method: 'POST',
        url: 'http://'+ config.bsApiUrl + "System/MigrateAppToNewDb",
        json:true,
        headers: {
            'Authorization': 'MasterKey ' + config.masterKey
        },
        agentOptions: {
            maxSockets: 1000
        },
        body : {
            "apiKey": config.appID,
            "serverGroupName": "Migrated",
            "sourceDbConfig": {
                "dbName": "srv2_EverliveData1",
                "dbHost": "localhost:27017",
                "dbHostReplica": "localhost:27019"
            },
            "targetDbConfig": {
                "dbName": "srv3_EverliveData1-dev",
                "dbHost": "bs-mongodb-1.dev.tap.internal:37017"
            },
            "stopApp": ""
        }
    };

    var executionStartTime = _.now();
    function callback(error, response, body) {
        var executionEndTime = _.now();

        if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
            console.log("App migrated successfully!");
        }else{
            console.log("Error migrating app: " + response.message);
        }
        console.log("It took : " + Math.round(executionEndTime - executionStartTime));
        console.log("=================================================================================");

    }
    request(options, callback);

}
//migrateApp();
makeParallelCallsAndMigrate(100);




