var path = require('path'),
    fs = require('fs'),
    rootPath = path.normalize(__dirname + '/../../');

var serverIP = '127.0.0.1',
    serverPort = 3310,

    //DB configuration
    mongoDBUser = 'user',
    mongoDBUSerPass = 'password',
    mongoDBHost = 'localhost',
    mongoDBPort = '27017',
    //Specify DB name mongoose will create automatically if not available
    mongoDBDatabaseName = 'testDataBase',
    dbConnectionString = 'mongodb://' + mongoDBUser + ':' + mongoDBUSerPass + '@' + mongoDBHost + ':' + mongoDBPort + '/' + mongoDBDatabaseName,

    //Root dir of the app
    dataDirRoot = rootPath + 'storage';

//Init storage folder if not created
(function initStorageFolderStructure() {
    fs.readdir(dataDirRoot,function(error, files){
        if(error){
            console.log('Does not exist: ',dataDirRoot);
            fs.mkdir(dataDirRoot,function(error, files){
                if(error){
                    console.log('Cannot create folder: ', dataDirRoot);
                }else{
                    console.log('Folder created ', dataDirRoot);
                }
            });
        }
    });
})();

module.exports = {
    rootPath: rootPath,
    port: serverPort,
    ip: serverIP,
    db: dbConnectionString,
    storageDir: dataDirRoot,
    baseUrl : 'http://' + serverIP + ':' + serverPort,
    session : {
        secret: 'nodeJsBareBones',
        resave: true,
        saveUninitialized: true
    },
    controllersConfig : {
        users: {
            dataRepository: {
                name: 'mongoDb'
            }
        }
    },
    socketIO: {
        port: 3020
    },
    sessionStore: {
        username: "username",
        password: "password",
        database: "database",
        storagePath : rootPath + "storage/sessions.sqlite"
    },
    googleApiCredentials : {
        clientId: "<CLIENT_ID>",
        clientSecret: "<CLIENT_SECRET",
        redirectUrl: "http://localhost:8085/api/google/googleOAuth2Callback"
    }
};