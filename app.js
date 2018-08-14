// Imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const params = require('./global/params');
const connection = require('./global/connection');
const routes = require('./routes/routes');

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
mongoose.connect(connection.URI2, {useNewUrlParser: true})
    .then(() => console.log('\x1b[32m%s\x1b[0m', 'Conexion a base de datos correcta'))
    .catch((error) => console.error(error));
mongoose.Promise = global.Promise;

// Subir imagenes
server.use(fileUpload());

// rutas
server.use(params.MAIN, routes);

// Escuchar peticiones
server.listen(PORT, () => {
    console.info('\x1b[32m%s\x1b[0m', 'Servidor express escuchando en el puerto: ' + PORT);
});
