const {Sequelize, DataTypes} = require('sequelize');
const usuarioModel = require('./usuarios');
const empresaModel = require('./empresas')
//Instancia
const sequelize = new Sequelize('data_food_db', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql' 
  });

const Usuario = usuarioModel(sequelize, Sequelize);
const Empresa = empresaModel(sequelize, Sequelize);

//sincronizacion
sequelize.sync({ force: false })
  .then(()=>{ //promesa
      console.log('Tablas Sincronizadas')
  });

  module.exports ={
      Usuario, 
      Empresa
  }