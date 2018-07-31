const Medico = require('../models/medico.model');

// =======================================================
// Test de respuesta
// =======================================================
exports.test = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Response Medicos!!'
    })
}

// =======================================================
// Listar medicos
// =======================================================
exports.getAll = (req, res) => {
    let page = req.query.page || 1;
    let docs = req.query.docs || 5;
    Medico.paginate({},
                    {populate: [{path: 'requestUser', select: '_id name'}, 
                                {path: 'hospital', select: '_id name'}],
                    page: page,
                    limit: docs})
          .then(result => {
            if (result.total > 0) {
                return res.status(200).json({
                    success: true,
                    pages: result.pages,
                    page: result.page,
                    medicos: result.docs
                });
            } else {
                return res.status(206).json({
                    success: true,
                    message: 'No existen medicos registrados en la base de datos'
                });
            }
          }).catch(err => {
            return res.status(500).json({
                success: false,
                message: 'Error al intentar listar los medicos registrados',
                error: err
            });
          });
}

// =======================================================
// Registrar medico
// =======================================================
exports.registerDoctor = (req, res) => {
    let body = req.body;
    let medico = new Medico({
        name: body.name,
        requestUser: req.usuario,
        hospital: body.hospital
    });
    medico.save()
          .then(saved => {
            res.status(201).json({
                success: true,
                message: 'Medico registrado en la base de datos',
                medico: saved
            });
          }).catch(err => {
            res.status(400).json({
                success: false,
                message: 'Error al intentar registrar datos de medico',
                error: err
            });
          });
}

// =======================================================
// Actualizar Medico
// =======================================================
exports.updateDoctor = (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Medico.findById(id)
          .exec()
          .then(doctor => {
            doctor.name = body.name;
            doctor.hospital = body.hospital;
            doctor.save()
                  .then(updated => {
                    res.status(200).json({
                        success: true,
                        message: 'Datos de medico actualizados',
                        medico: updated
                    })
                  }).catch(err => {
                    res.status(400).json({
                        success: false,
                        message: 'Ocurrio un error al actualizar datos de medico',
                        error: err
                    })
                  })
          }).catch(err => {
            res.status(400).json({
                success: false,
                message: 'Error al buscar datos de medico',
                error: err
            })
          });
}

// =======================================================
// Eliminar medico
// =======================================================
exports.deleteDoctor = (req, res) => {
    let id =  req.params.id;
    Medico.findByIdAndRemove(id)
          .exec()
          .then(deleted => {
            res.status(200).json({
                success: true,
                message:'Datos de medico eliminados',
                medico: deleted
            })
          }).catch(err => {
            res.status(400).json({
                success: false,
                message: 'Error al intentar eliminar datos de medico',
                error: err
            })
          });
}
