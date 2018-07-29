const express = require('express');
const medicoController = require('../controllers/medico.controller');
const auth = require('../middlewares/authentication');

let router = express.Router();

// Rutas
router.get('/medicos/test', medicoController.test);
router.get('/medicos', auth.verifyToken, medicoController.getAll);
router.post('/medicos', auth.verifyToken, medicoController.registerDoctor);
router.put('/medicos/:id', auth.verifyToken, medicoController.updateDoctor);
router.delete('/medicos/:id', auth.verifyToken, medicoController.deleteDoctor);

module.exports = router;
