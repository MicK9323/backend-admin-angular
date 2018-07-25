var express = require('express')
// Llamar controlador
var usuarioController = require('../controllers/app.controller')

var router = express.Router()

router.get('/', usuarioController.appTest)

module.exports = router
