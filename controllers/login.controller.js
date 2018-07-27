// Imports
var Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const params = require('../global/params');
const auth = require('../middlewares/authentication');

exports.login = (req, res) => {
  let body = req.body;
  Usuario.findOne({
      email: body.email
    })
    .exec()
    .then(usuario => {
      if (usuario) {
        if (bcrypt.compareSync(body.password, usuario.password)) {
          usuario.password = '*********';
          let token = auth.generateToken(usuario, 60*60*1);
          res.status(200).json({
            success: true,
            usuario: usuario,
            id: usuario._id,
            token: token
          });
        } else {
          res.status(406).json({
            success: false,
            message: 'Credenciales Incorrectas'
          });
        }
      } else {
        res.status(406).json({
          success: false,
          message: 'Credenciales Incorrectas'
        });
      }
    }).catch(err => {
      res.status(400).json({
        success: false,
        message: 'Ocurrio un error al iniciar sesión',
        error: err
      });
    })
}