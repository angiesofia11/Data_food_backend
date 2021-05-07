const {Sequelize, DataTypes} = require('sequelize');
const usuarioModel = require('./usuarios');
const empresaModel = require('./empresas');
const dietaModel = require('./dietas');
//Instancia
const sequelize = new Sequelize('JmlUzblodC', 'JmlUzblodC', 'kfKSC28YQK', {
    host: 'remotemysql.com',
    port: '3306',
    dialect: 'mysql' 
  });

const Usuario = usuarioModel(sequelize, Sequelize);
const Empresa = empresaModel(sequelize, Sequelize);
const Dieta = dietaModel(sequelize, Sequelize);

//sincronizacion
sequelize.sync({ force: true})
  .then(()=>{ //promesa
      console.log('Tablas Sincronizadas')
  });

  module.exports ={
      Usuario, 
      Empresa, 
      Dieta
  }