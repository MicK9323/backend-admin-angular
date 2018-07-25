var express = require('express')
var usuarioController = require('../controllers/usuario.controller')

var router = express.Router()

router.get('/test', usuarioController.usuarioTest)
router.get('/', usuarioController.getUsuarios)

module.exports = router
