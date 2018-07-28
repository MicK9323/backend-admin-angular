const Hospital = require('../models/hospital.model');

// =======================================================
// Test de respuesta
// =======================================================
exports.test = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Hospital response!'
    })
}

// =======================================================
// Listar hospitales
// =======================================================
exports.getHospitals = (req, res) => {
    Hospital.find({})
            .populate({path: 'user', select: '_id name'})
            .exec()
            .then(hospitals => {
                if (hospitals.length > 0) {
                    res.status(200).json({
                        success: true,
                        hospitales: hospitals
                    });
                } else {
                    res.status(206).json({
                        success: true,
                        message: 'No se encontraron hospitales registrados'
                    });
                }
            }).catch(err => {
                res.status(500).json({
                    success: false,
                    message: 'Ocurrio un error al listar los hospitales',
                    error: err
                });
            });
}

// =======================================================
// Registrar hospital
// =======================================================
exports.saveHospital = (req, res) => {
    let body = req.body;
    let hospital = new Hospital({
        name: body.name,
        requestUser: req.usuario._id
    });
    hospital.save()
            .then(newHospital => {
                res.status(201).json({
                    success: true,
                    hospital: newHospital
                });
            }).catch(err => {
                res.status(400).json({
                    success: false,
                    message: 'Error al intentar registrar el hospital',
                    error: err
                });
            });
}

// =======================================================
// Actualizar hospital
// =======================================================
exports.updateHospital = (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Hospital.findById(id)
            .exec()
            .then(hospital => {
                hospital.name = body.name,
                hospital.updatedUser = req.usuario._id
                hospital.save()
                        .then(updated => {
                            res.status(200).json({
                                success: true,
                                hospital: updated
                            });
                        }).catch(err => {
                            res.status(400).json({
                                success: false,
                                message: 'Error al intentar actualizar datos de hospital',
                                error: err
                            });
                        });
            }).catch(err => {
                res.status(400).json({
                    success: false,
                    message: 'Error al buscar datos de hospital',
                    error: err
                });
            });
}

// =======================================================
// Eliminar hospital
// =======================================================
exports.deleteHospital = (req, res) => {
    let params = req.params;
    Hospital.findByIdAndRemove(params.id)
            .exec()
            .then(deleted => {
                if (deleted) {
                    res.status(200).json({
                        success: true,
                        message: 'Hospital eliminado',
                        hospital: deleted
                    });
                } else {
                    res.status(206).json({
                        success: false,
                        message: 'No hay un hospital con el id ingresado'
                    });
                }
            }).catch(err => {
                res.status(400).json({
                    success: false,
                    message: 'Error al eliminar datos de hospital',
                    error: err
                });
            })
}
