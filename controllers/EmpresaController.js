const models = require('../models');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports={

login: async(req, res, next)=>{

    console.log(req.body)

    try {
        console.log(req.body.email)

        let empresa = await models.Empresa.findOne({ where: { correo: req.body.email } });
        if (empresa) {

            console.log(req.body.pws, empresa.pws)

            let match = await bcrypt.compare(req.body.password, empresa.pws);


            if (match) {
                //console.log(empresa.rol);
                //let tokenReturn = await token.encode(user.id, user.rol);
                //res.status(200).json({ user, tokenReturn });
                const token = jwt.sign({
                    id:empresa.id, 
                    nombre: empresa.nombre_empresa, 
                    correo: empresa.correo, 
                    //rol: usuario.rol, 
                    //estado: usuario.estado

                }, 'config.secret', {
                    expiresIn: 86400,
                }
                
                );
                res.status(200).send({

                    auth: true, 
                    tokenReturn: token, 
                    empresa: empresa
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

    console.log(req.body)
    try {
        console.log(req.body.pws)
        req.body.pws = await bcrypt.hash(req.body.pws, 10);
        const reg = await models.Empresa.create(req.body);
        
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
        const reg = await models.Empresa.findAll();
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
        const reg = await models.Empresa.findOne({where: {correo: req.body.email}});
        if ( clave != reg.pws) {
            req.body.pws = await bcrypt.hash(req.body.pws, 10);
        }
        const reg2 = await models.Empresa.update({nombre_usuario: req.body.nombre, rol: req.body.rol, correo: req.body.email, pws: req.body.pws}, { where: { id: req.body.id}});
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
        const reg = await models.Empresa.update({estado: 1},{where: {id: req.body.id}});
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
        const reg = await models.Empresa.update({estado: 0},{where: {id: req.body.id}});
        res.status(200).json(reg);
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error)
    }
}

}