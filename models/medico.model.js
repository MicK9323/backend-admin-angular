const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const medicoSchema = new Schema({
    name: {type: String, required: [true, 'El campo nombre es requerido']},
    img: {type: String, required: false},
    requestUser: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    hospital: {type: Schema.Types.ObjectId, ref: 'Hospital', required: [true, 'Debe asignar un hospital']}
}, {collection: 'medicos'});

module.exports = mongoose.model('Medico', medicoSchema);
