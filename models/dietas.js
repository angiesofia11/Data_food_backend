module.exports = (sequelize, type)=>{
    return sequelize.define('dieta', {
        // Model attributes are defined here
        usuario_id:{
            type: type.INTEGER,
            primaryKey: true, 
            allowNull: false, 
            autoIncrement: true
        },
        preferencias: type.STRING, 
        estado_id: type.INTEGER
        
        });

};