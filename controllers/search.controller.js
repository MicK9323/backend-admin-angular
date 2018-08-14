const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');
const Usuario = require('../models/usuario.model');

function setRegExp(term) {
    return new RegExp(term, 'i');
}

function findHospitals(term) {
    return new Promise((resolve, reject) => {
        Hospital.find({name: term}, '_id name')
            .then(hospitales => {
                resolve(hospitales);
            }).catch(err => {
                reject('Error al cargar hospitales', err);
            });
    });
}

function findDoctors(term) {
    return new Promise((resolve, reject) => {
        Medico.find({ name: term}, '_id name hospital')
            .populate({
                path: 'hospital',
                select: '_id name'
            })
            .exec()
            .then(medicos => {
                resolve(medicos);
            }).catch(err => {
                reject('Error al cargar medicos', err);
            });
    });
}

function findUsers(term) {
    return new Promise((resolve, reject) => {
        Usuario.find({}, '_id name email role')
            .or([{name: term}, {email: term}])
            .exec()
            .then(users => {
                resolve(users);
            }).catch(err => {
                reject('Error al cargar usuarios', err);
            });
    });
}

// =======================================================
// Busqueda en todas las colecciones
// =======================================================
exports.searchAllCollections = (req, res) => {

    let term = req.query.term || '';
    if (term.length >= 5) {
        let search = setRegExp(term);

        Promise.all([
            findHospitals(search),
            findDoctors(search),
            findUsers(search)
        ]).then(results => {
            res.status(200).json({
                success: true,
                hospitales: results[0],
                medicos: results[1],
                usuarios: results[2]
            });
        }).catch(errors => {
            res.status(400).json({
                success: false,
                message: 'Error al solicitar la carga de datos',
                errors: errors
            });
        });

    } else {
        res.status(400).json({
            success: false,
            message: 'El termino de busqueda debe tener por lo menos 5 caracteres'
        });
    }

}

// =======================================================
// Busqueda segun coleccion
// =======================================================
exports.searchByCollection = (req, res) => {
    let term = req.query.term || '';
    if (term.length >= 5){
        let search = setRegExp(term);
        let promise;
        let collection = req.params.collection;

        switch (collection) {
            case 'hospitales':
                promise = findHospitals(search);
                break;
            case 'medicos':
                promise = findDoctors(search);
                break;
            case 'usuarios':
                promise = findUsers(search);
                break;
            default:
                res.status(400).json({
                    success: false,
                    message: 'No existe la coleccion solicitada'
                });
                break;
        }

        promise.then( data => {
            res.status(200).json({
                success: true,
                results: data
            });
        }).catch(err => {
            res.status(500).json({
                success: false,
                message: 'Error al realizar la consulta al servidor',
                error: err
            });
        });

    }else {
        res.status(400).json({
            success: false,
            message: 'El termino de busqueda debe tener por lo menos 5 caracteres'
        });
    }
}
