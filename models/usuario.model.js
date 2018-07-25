var mongoose = require('mongoose')

var Schema = mongoose.Schema

var usuarioSchema = new Schema({
  name: { type: String, required: [true, 'Campo nombre requerido'] },
  email: { type: String, required: [true, 'Campo correo requerido'] },
  password: { type: String, required: [true, 'Contraseña necesaria'] },
  img: { type: String, required: false },
  role: { type: String, required: true, default: 'USER_ROLE' }
})

module.exports = mongoose.model('Usuario', usuarioSchema)
