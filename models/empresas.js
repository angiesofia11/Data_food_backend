module.exports = (sequelize, type)=>{
    return sequelize.define('empresa', {
        // Model attributes are defined here
        id:{
            type: type.INTEGER,
            primaryKey: true, 
            allowNull: false, 
            autoIncrement: true
        },
        nombre_empresa: type.STRING, 
        nit: type.STRING, 
        telefono: type.STRING,
        correo: type.STRING,
        pws: type.STRING,
        estado: type.INTEGER
        
        });

};