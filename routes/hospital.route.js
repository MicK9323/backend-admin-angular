const express = require('express');
const hospitalController = require('../controllers/hospital.controller');
const auth = require('../middlewares/authentication');

let router = express.Router();

router.get('/hospitales/test', hospitalController.test);
router.get('/hospitales', auth.verifyToken, hospitalController.getHospitals);
router.post('/hospitales', auth.verifyToken, hospitalController.saveHospital);
router.put('/hospitales/:id', auth.verifyToken, hospitalController.updateHospital);
router.delete('/hospitales/:id', auth.verifyToken, hospitalController.deleteHospital);


module.exports = router;
