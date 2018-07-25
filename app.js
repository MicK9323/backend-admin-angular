// Imports
var express = require('express')
var mongoose = require('mongoose')

// Importar Rutas
var appRoutes = require('./routes/app.route')
var usuarioRoutes = require('./routes/usuario.route')

// Inicializar variables
var server = express()

// Puerto de escucha del server
const PORT = process.env.PORT || 25357
// const PORT = 25357

// Conexion a BD
const URI = 'mongodb://mcortegana.documents.azure.com:10255/hospitaldb?ssl=true?'
var username = 'mcortegana'
var password = 'J2G8I08i0thXLbF2paOjwmNZp3jeIOGjHyix1YtSberOVswEpQjWnCKitNdRlvuQ9ElGm6h8v2TCrZdh1lI4jg=='
mongoose.connect(URI, {
  auth: {
    user: username,
    password: password
  },
  useNewUrlParser: true
})
  .then(() => console.log('\x1b[32m%s\x1b[0m', 'Conexion a base de datos correcta'))
  .catch((error) => console.error(error))
mongoose.Promise = global.Promise

// rutas
server.use('/', appRoutes)
server.use('/usuarios', usuarioRoutes)

// Escuchar peticiones
server.listen(PORT, () => {
  console.info('\x1b[32m%s\x1b[0m', 'Servidor express escuchando en el puerto: ' + PORT)
})
