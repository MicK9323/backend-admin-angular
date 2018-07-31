const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    name: {type: String, required: [true, 'El nombre es requerido']},
    img: {type: String, required: false},
    requestUser: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    updatedUser: {type: Schema.Types.ObjectId, ref: 'Usuario'}
}, {collection: 'hospitales'})

hospitalSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Hospital', hospitalSchema);
