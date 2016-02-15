var Sequelize  = require('sequelize');

var sequelizeInstance = new Sequelize('appData', 'everlive', 'everlive', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: './data/appData.sqlite'
});
