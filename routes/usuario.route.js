const express = require('express');
const usuarioController = require('../controllers/usuario.controller');
const auth = require('../middlewares/authentication');

let router = express.Router()

router.get('/usuarios/test', usuarioController.usuarioTest);
router.get('/usuarios', auth.verifyToken, usuarioController.getUsuarios);
router.post('/usuarios', auth.verifyToken, usuarioController.saveUsuario);
router.put('/usuarios/:id', auth.verifyToken, usuarioController.updateUsuario);
router.delete('/usuarios/:id', auth.verifyToken, usuarioController.deleteUser);

module.exports = router;
