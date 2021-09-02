const { Sequelize } = require("sequelize")
const config = require("../config.json");
module.exports = new Sequelize({
    storage: './db.sqlite',
    dialect: 'sqlite',
    logging: false
})