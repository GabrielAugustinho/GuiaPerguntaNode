const Sequelize = require('sequelize');

const connection = new Sequelize({
    username: 'root',
    password: '1@allebagord',
    database: 'guiaperguntas',
    host: 'localhost',
    dialect: 'mysql',
    port: '3360'
});

module.exports = connection;