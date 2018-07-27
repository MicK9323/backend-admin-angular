const express = require('express');
// Llamar controlador
const usuarioController = require('../controllers/app.controller');

let router = express.Router();

router.get('/test', usuarioController.appTest);

module.exports = router;
