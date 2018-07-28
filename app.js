// Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importar Rutas
let appRoutes = require('./routes/app.route');
let loginRoutes = require('./routes/login.route');
let usuarioRoutes = require('./routes/usuario.route');
let hospitalRoutes = require('./routes/hospital.route');


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
const URI = 'mongodb://mcortegana.documents.azure.com:10255/hospitaldb?ssl=true?';
let username = 'mcortegana';
let password = 'J2G8I08i0thXLbF2paOjwmNZp3jeIOGjHyix1YtSberOVswEpQjWnCKitNdRlvuQ9ElGm6h8v2TCrZdh1lI4jg==';
mongoose.connect(URI, {
    auth: {
      user: username,
      password: password
    },
    useNewUrlParser: true
  })
  .then(() => console.log('\x1b[32m%s\x1b[0m', 'Conexion a base de datos correcta'))
  .catch((error) => console.error(error));
mongoose.Promise = global.Promise;

// rutas
server.use('/api', appRoutes);
server.use('/api', loginRoutes);
server.use('/api', usuarioRoutes);
server.use('/api', hospitalRoutes);

// Escuchar peticiones
server.listen(PORT, () => {
  console.info('\x1b[32m%s\x1b[0m', 'Servidor express escuchando en el puerto: ' + PORT);
});