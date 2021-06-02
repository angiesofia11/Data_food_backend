const router = require('express').Router();
const usuarioController = require('../../controllers/UsuarioController')
const { Usuario} = require('../../models');

var bcrypt = require('bcryptjs');
//const { json } = require('sequelize/types');

//api/usuario/
/*router.get('/', async(req, res)=>{
    const usuario = await Usuario.findAll();
    res.status(200).json(usuario);
})*/

//api/usuario/registrar

router.post('/registrar', async(req, res)=>{
    
    //console.log(res);
    console.log(req.body)

    //const salt = await bcrypt.genSaltSync(10);
    //req.body.pws = await bcrypt.hash(req.body.pws, salt);
    //console.log(req.body);

    req.body.pws =  bcrypt.hashSync(req.body.pws, 10);
    const usuario = await Usuario.create(req.body);
    res.status(200).json(usuario);
    
});




router.get('/', usuarioController.list);
router.put('/update', usuarioController.update);
router.put('/activate', usuarioController.activate);
router.put('/desactivate', usuarioController.deactivate);
//router.post('/registrar', usuarioController.registar);
router.post('/login', usuarioController.login);

module.exports = router;