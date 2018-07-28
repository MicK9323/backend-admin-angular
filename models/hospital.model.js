const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    name: {type: String, required: [true, 'El nombre es requerido']},
    img: {type: String, required: false},
    requestUser: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    updatedUser: {type: Schema.Types.ObjectId, ref: 'Usuario'}
}, {collection: 'hospitales'})

module.exports = mongoose.model('Hospital', hospitalSchema);
