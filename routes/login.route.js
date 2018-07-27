const express = require('express');
const loginController = require('../controllers/login.controller');

let router = express.Router();

router.post('/login', loginController.login);

module.exports = router;
