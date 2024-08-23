const {  DataTypes } = require('sequelize');
const sequelize = require('../sequelize')
// const sequelize = new Sequelize('sqlite::memory:');
const Message = sequelize.define('Message', {
    text: DataTypes.STRING,
    chatID: DataTypes.STRING,
    sender: DataTypes.STRING,//id
});


module.exports=Message