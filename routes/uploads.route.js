const express = require('express');
const uploadsController = require('../controllers/uploads.controller');
const auth = require('../middlewares/authentication');

let router = express.Router();

router.get('/uploads/test', uploadsController.uploadsTest);
router.put('/uploads', auth.verifyToken, uploadsController.uploadFile);

module.exports = router;
