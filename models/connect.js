const dbConfig = require(process.cwd() + '/config/db.config.js')

const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    port: dbConfig.PORT,
    dialectOptions: {
        options: {
            // enableArithAbort: true,
            encrypt: false
        }
    }


})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = sequelize;