const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

const validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE', 'VISIT_ROLE'],
  message: 'El rol {VALUE} ingresado es invalido'
}

const usuarioSchema = new Schema({
  name: { type: String, required: [true, 'Campo nombre requerido'] },
  email: { type: String, unique: true, required: [true, 'Campo correo requerido'] },
  password: { type: String, required: [true, 'Contraseña necesaria'] },
  img: { type: String, required: false },
  role: { type: String, required: true, default: 'USER_ROLE', enum: validRoles }
});

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya se encuentra registrado'})

module.exports = mongoose.model('Usuario', usuarioSchema)
