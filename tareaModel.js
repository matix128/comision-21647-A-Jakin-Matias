const { Sequelize, DataTypes } = require('sequelize');
const {sequelize,DBtest} = require("./database.js");
const temas = sequelize.define('temas', {
    
    Titulo: {
      type: DataTypes.STRING,
      
    },
    Contenido: {
      type: DataTypes.STRING
      
    },
    Imagen: {
        type: DataTypes.STRING
        
      },
     Fechac:{
      type: DataTypes.STRING
      
    }
  }, {
    timestamps: false,
    tableName:"temas",
  });
  module.exports = temas;