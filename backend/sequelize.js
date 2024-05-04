const { Sequelize } = require('sequelize');
require('dotenv').config()

const dbName = process.env.DATABASE_NAME
const dbUser =process.env.DATABASE_USER
const dbPassword =process.env.DATABASE_PASSWORD
const dbHost = process.env.DATABASE_HOST
const dbPort = process.env.DATABASE_PORT

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port:dbPort,
    dialect:'mysql' 
  });

  module.exports=sequelize
