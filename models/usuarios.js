module.exports = (sequelize, type)=>{
    return sequelize.define('usuario', {
        // Model attributes are defined here
        id:{
            type: type.INTEGER,
            primaryKey: true, 
            allowNull: false, 
            autoIncrement: true
        },
        tipo_identificacion: type.INTEGER, 
        numero_identificacion: type.INTEGER, 
        nombre_usuario: type.STRING, 
        apellidos_usuario: type.STRING, 
        pais: type.STRING,
        ciudad: type.STRING,
        telefono: type.STRING,
        pws: type.STRING, 
        correo: type.STRING,
        fecha_nacimiento: type.DATEONLY,
        genero: type.INTEGER, 
        rol: type.INTEGER, 
        estado: type.INTEGER, 
        aceptacion_terminos: type.STRING, 
        fecha_aceptacion_terminos: type.DATE
        });

};