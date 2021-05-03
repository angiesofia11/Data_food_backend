const router = require('express').Router();
const apiRouterEmpresa = require('./api/empresas');
const apiRouterUsuario = require('./api/usuarios');

router.use('/usuario', apiRouterUsuario);
router.use('/empresa', apiRouterEmpresa);


module.exports = router;