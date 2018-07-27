// Imports
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

// =======================================================
// Prueba de respuesta
// =======================================================
exports.usuarioTest = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Get usuarios!!'
  });
}

// =======================================================
// Listar Usuarios
// =======================================================
exports.getUsuarios = (req, res) => {
  Usuario.find({})
    .select('name email img role')
    .exec()
    .then(usuarios => {
      if (usuarios.length > 0) {
        res.status(200).json({
          success: true,
          usuarios: usuarios
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'No hay usuarios registrados',
        });
      }
    }).catch(error => {
      res.status(500).json({
        success: false,
        message: 'Error al listar los usuarios',
        error: error
      });
    })
}

// =======================================================
// Registrar nuevo usuario
// =======================================================
exports.saveUsuario = (req, res) => {
  let usuario = new Usuario({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 15),
    img: req.body.img,
    role: req.body.role
  });
  usuario.save()
    .then(newUsuario => {
      res.status(201).json({
        success: true,
        usuario: newUsuario,
        requestUser: req.usuario
      });
    }).catch(error => {
      res.status(400).json({
        success: false,
        message: 'Error al crear nuevo usuario',
        error: error
      });
    });
}

// =======================================================
// Actualizar usuario
// =======================================================
exports.updateUsuario = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  Usuario.findById(id)
    .exec()
    .then(usuario => {
      usuario.name = body.name;
      usuario.email = body.email;
      usuario.role = body.role;
      usuario.save()
        .then(updatedUser => {
          res.status(200).json({
            success: true,
            usuario: updatedUser,
            requestUser: req.usuario
          });
        }).catch(error => {
          res.status(400).json({
            success: false,
            message: 'Error al actualizar el usuario',
            error: error
          });
        })
    }).catch(error => {
      res.status(400).json({
        success: false,
        message: 'Error al buscar usuario',
        error: error
      });
    });
}

// =======================================================
// Eliminar Usuario
// =======================================================
exports.deleteUser = (req, res) => {
  var id = req.params.id;

  Usuario.findByIdAndRemove(id)
    .exec()
    .then(deletedUser => {
      if (deletedUser) {
        res.status(200).json({
          success: true,
          message: 'Usuario Eliminado',
          usuario: deletedUser,
          requestUser: req.usuario
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'No hay un usuario con el id ingresado'
        });
      }
    }).catch(error => {
      res.status(400).json({
        success: true,
        message: 'Error al eliminar el usuario',
        error: error
      });
    });
}
