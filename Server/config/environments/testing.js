var path = require('path'),
    fs = require('fs'),
    rootPath = path.normalize(__dirname + '/../../');

var serverIP = '127.0.0.1',
    serverPort = 3310,

//DB configuration
    mngoDBUser = '',
    mongoDBUSerPass = '',
    mongoDBHost = '127.0.0.1',
    mongoDBPort = '27017',
    //Specify DB name mongoose will create automatically if not available
    mongoDBDatabaseName = 'nodeBareBones_test',
    dbConnectionString = 'mongodb://'+mongoDBHost+':'+mongoDBPort+'/'+mongoDBDatabaseName,

//Root dir of the app
    dataDirRoot = rootPath;

//Init storage folder if not created
(function initStorageFolderStructure() {
    fs.readdir(dataDirRoot + 'storage',function(error, files){
        if(error){
            console.log('Does not exist: ',dataDirRoot+ '/storage');
            fs.mkdir(dataDirRoot + 'storage',function(error, files){
                if(error){
                    console.log('Cannot create folder: ', dataDirRoot + '/storage');
                }else{
                    console.log('Folder created ', dataDirRoot + '/storage');
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
        secret: 'nodeBareBones',
        resave: true,
        saveUninitialized: true
    }
};