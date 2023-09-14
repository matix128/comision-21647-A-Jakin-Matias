const { Sequelize } = require('sequelize');
const dbName = process.env.DB_NAME
const dbUserName = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD


const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {

    host: 'localhost',
    dialect: "mariadb"
  });
  const DBtest = async ()=> {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  module.exports = {sequelize,DBtest}