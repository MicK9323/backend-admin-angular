// Imports
var Usuario = require('../models/usuario.model')

exports.usuarioTest = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get usuarios!!'
  })
}

exports.getUsuarios = (req, res, next) => {
  Usuario.find({})
    .select('name email img role')
    .exec()
    .then(usuarios => {
      if (usuarios.length > 0) {
        res.status(200).json({
          success: true,
          usuarios: usuarios
        })
      } else {
        res.status(200).json({
          success: true,
          message: 'No hay usuarios registrados'
        })
      }
    }).catch(error => {
      res.status(500).json({
        success: false,
        message: 'Error al listar los usuarios',
        error: error
      })
    })
}
