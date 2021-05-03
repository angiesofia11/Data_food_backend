const router = require('express').Router();
const { Empresa } = require('../../models');
const empresaController = require('../../controllers/EmpresaController')
var bcrypt = require('bcryptjs');




/*router.get('/', async(req, res)=>{
    const empresa = await Empresa.findAll();
    res.status(200).json(empresa);
})
//api/usuario/registrar

router.post('/registrar', async(req, res)=>{
    const salt = await bcrypt.genSaltSync(10);
    req.body.pws = await bcrypt.hash(req.body.pws, salt);
    //req.body.constraseña =  bcrypt.hashSync(req.body.constraseña, 10);
    const empresa = await Empresa.create(req.body);
    res.status(200).json(empresa);
});*/



router.get('/', empresaController.list);
router.get('/update', empresaController.update);
router.get('/activate', empresaController.activate);
router.get('/desactivate', empresaController.deactivate);
router.post('/registrar', empresaController.add);
router.post('/login', empresaController.login);


module.exports= router;

