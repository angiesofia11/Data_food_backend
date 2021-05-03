const models = require('../models');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*exports.login = async(req, res , next)=>{
    console.log(req.body);
    try{
        const usuario = await models.Usuario.findOne({where: {correo: req.body.correo}});
        if(usuario){
            console.log(usuario.pws)

            //const salt = await bcrypt.genSaltSync(10);
            //req.body.pws = await bcrypt.hash(req.body.pws, salt);

            console.log(req.body.pws)

            const verified = bcrypt.compareSync('', usuario.pws);
            console.log(verified)
            let  pwsIsValid =  bcrypt.compareSync(req.body.pws, usuario.pws);
            co

            console.log(req.body.pws, usuario.pws)
            if(pwsIsValid){
                const token = jwt.sign({
                    id:usuario.id, 
                    nombre: usuario.nombre_usuario, 
                    correo: usuario.correo, 
                    rol: usuario.rol, 
                    estado: usuario.estado

                }, 'config.secret', {
                    expiresIn: 86400,
                }
                
                );
                res.status(200).send({

                    auth: true, 
                    tokenReturn: token, 
                    usuario: usuario
                })

            }else{
                res.status(401).json({
                    error: 'Correo electrónico o pws inválidos'
                })
            }
        }else{
            res.status(404).json({
                error: 'Correo electrónico o pws inválidos'
            })

        }
    }catch(error){
        res.status(500).send({
            message: 'Error'
        })

        next(error);

    }
};*/

module.exports = {
    login: async(req, res, next) => {
        try {
            console.log(req.body)
            let usuario = await models.Usuario.findOne({ where: { correo: req.body.email} });
            console.log(req.body.email)
            if (usuario) {

                console.log(req.body.password, usuario.pws)

                let match = await bcrypt.compare(req.body.password, usuario.pws);

                console.log(req.body.email)


                if (match) {
                    console.log(usuario.rol);
                    //let tokenReturn = await token.encode(user.id, user.rol);
                    //res.status(200).json({ user, tokenReturn });
                    const token = jwt.sign({
                        id:usuario.id, 
                        nombre: usuario.nombre_usuario, 
                        correo: usuario.correo, 
                        rol: usuario.rol, 
                        estado: usuario.estado
    
                    }, 'config.secret', {
                        expiresIn: 86400,
                    }
                    
                    );
                    res.status(200).send({
    
                        auth: true, 
                        tokenReturn: token, 
                        usuario: usuario
                    })

                } else {
                    res.status(401).send({
                        message: 'Correo electrónico o contraseña inválidos'
                    });
                }
            } else {
                res.status(404).send({
                    message: 'Correo electrónico o contraseña inválidos'
                });
            }
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    add: async(req, res, next) =>{
        try {
            req.body.pws = await bcrypt.hash(req.body.pws, 10);
            const reg = await models.Usuario.create(req.body);
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    list: async(req, res, next) => {
        try {
            let valor = req.query.valor;
            const reg = await models.Usuario.findAll();
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    update: async(req, res, next) => {
        try {
            let clave = req.body.pws;
            const reg = await models.Usuario.findOne({where: {correo: req.body.correo}});
            if ( clave != reg.pws) {
                req.body.pws = await bcrypt.hash(req.body.pws, 10);
            }
            const reg2 = await models.Usuario.update({nombre_usuario: req.body.nombre, rol: req.body.rol, correo: req.body.correo, pws: req.body.pws}, { where: { id: req.body.id}});
            res.status(200).json(reg2);
        } catch(error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    activate: async(req, res, next) => {
        try {
            const reg = await models.Usuario.update({estado: 1},{where: {id: req.body.id}});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error);
        }
    },
    deactivate: async(req, res, next) => {
        try {
            const reg = await models.Usuario.update({estado: 0},{where: {id: req.body.id}});
            res.status(200).json(reg);
        } catch (error) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(error)
        }
    }
    }
