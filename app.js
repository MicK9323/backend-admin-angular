// Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const params = require('./global/params');
const connection = require('./global/connection');

// Importar Rutas
let appRoutes = require('./routes/app.route');
let loginRoutes = require('./routes/login.route');
let usuarioRoutes = require('./routes/usuario.route');
let hospitalRoutes = require('./routes/hospital.route');
let medicoRoutes = require('./routes/medico.route');

// Inicializar variables
let server = express();
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(bodyParser.json());

// Puerto de escucha del server
const PORT = process.env.PORT || 25357;
// const PORT = 25357

// Conexion a BD
mongoose.connect(connection.URI, {
    auth: {
      user: connection.USER,
      password: connection.PASSWORD
    },
    useNewUrlParser: true
  })
  .then(() => console.log('\x1b[32m%s\x1b[0m', 'Conexion a base de datos correcta'))
  .catch((error) => console.error(error));
mongoose.Promise = global.Promise;

// rutas
server.use(params.MAIN, appRoutes);
server.use(params.MAIN, loginRoutes);
server.use(params.MAIN, usuarioRoutes);
server.use(params.MAIN, hospitalRoutes);
server.use(params.MAIN, medicoRoutes);

// Escuchar peticiones
server.listen(PORT, () => {
  console.info('\x1b[32m%s\x1b[0m', 'Servidor express escuchando en el puerto: ' + PORT);
});