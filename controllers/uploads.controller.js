const fileUpload = require('express-fileupload');
const fs = require('fs');
const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');
const params = require('../global/params');
const G = require('../global/util');

// =======================================================
// Test de servicio
// =======================================================
exports.uploadsTest = (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Uploads run!!'
    })
};

// =======================================================
// Validar extension de archivo
// =======================================================
function validateExtension(filename, res) {
    if (!G.findInArray(params.VALID_EXTENSIONS, G.getFileExtension(filename))) {
        return res.status(400).json({
            success: false,
            message: `Extension de archivo ${filename} inválida`,
            error: {
                message: `Extensiones validas: ${params.VALID_EXTENSIONS.join(', ')}`
            }
        });
    }
}

// =======================================================
// Upload file
// =======================================================
function upload(model, collection, id, file, res) {
    model.findById(id, 'img')
        .exec()
        .then(document => {
            if (document) {
                let oldPath = `./uploads/${collection}/${document.img}`;
                G.removeIfExists(oldPath);
                let uniqueFileName = G.setUniqueFileName(id, G.getFileExtension(file.name));
                let newPath = `./uploads/${collection}/${uniqueFileName}`;
                file.mv(newPath)
                    .then(() => {
                        document.img = uniqueFileName;
                        document.save()
                                .then(() => {
                                    return res.status(200).json({
                                        success: true,
                                        message: 'Imagen almacenada con exito'
                                    });
                                }).catch(err => {
                                    G.removeIfExists(newPath);
                                    return res.status(500).json({
                                        success: false,
                                        message: `Error al registrar los cambios al documento solicitado`,
                                        error: err
                                    });
                                });
                    }).catch(err => {
                    return res.status(417).json({
                        success: false,
                        message: `Ocurrio un error al subir el archivo ${file.name}`,
                        error: err
                    });
                });
            }else {
                return res.status(400).json({
                    success: true,
                    message: `No existe un ${collection} con este id`
                });
            }
        }).catch(err => {
            return res.status(500).json({
                success: false,
                message: `Error al buscar el ${collection} solicitado`,
                error: err
            });
        });
}

// =======================================================
// Validar coleccion
// =======================================================
function validateAndUpload(collection, id, file, res) {
    validateExtension(file.name, res);
    switch (collection) {
        case 'usuarios':
            upload(Usuario, collection, id, file, res);
            break;
        case 'medicos':
            upload(Medico, collection, id, file, res);
            break;
        case 'hospitales':
            upload(Hospital, collection, id, file, res);
            break;
        default:
            return res.status(400).json({
                success: false,
                message: `Ruta de destino ${collection} invalida`,
                error: {
                    message: `Rutas aceptadas: ${params.VALID_COLLECTIONS.join(', ')}`
                }
            });
    }
}

// =======================================================
// Subir imagen
// =======================================================
exports.uploadFile = (req, res) => {
    if (!req.files) {
        return res.status(400).json({
            success: false,
            message: 'Debe seleccionar un archivo de imagen'
        });

    }

    let file = req.files.imagen || null;
    let collection = req.query.collection || '';
    let id = req.query.id || '';

    validateAndUpload(collection, ''+id, file, res);
};
