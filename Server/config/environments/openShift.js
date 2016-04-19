//Configuration for deployment on OpenShift
var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../'),
    fs = require('fs');

var ip = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT;
var dataDirRoot =  process.env.OPENSHIFT_DATA_DIR;
var connection_string = '';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

//Init storage folder if not created
(function initStorageFolderStructure() {
    fs.readdir(dataDirRoot + '/storage',function(error, files){
        if(error){
            console.log('Does not exist: ',dataDirRoot+ '/storage');
            fs.mkdir(dataDirRoot + '/storage',function(error, files){
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
    port: port,
    ip: ip,
    db: connection_string,
    baseUrl : 'http://' + ip + ':' + port,
    storageDir: dataDirRoot,
    session : {
        secret: 'nodeBareBones',
        resave: true,
        saveUninitialized: true
    }
};