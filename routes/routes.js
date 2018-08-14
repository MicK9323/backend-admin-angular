// rutas
const appRoutes = require('./app.route');
const loginRoutes = require('./login.route');
const usuarioRoutes = require('./usuario.route');
const hospitalRoutes = require('./hospital.route');
const medicoRoutes = require('./medico.route');
const searchRoutes = require('./search.route');
const uploadsRoutes = require('./uploads.route');

const ROUTES = [
    appRoutes, 
    loginRoutes, 
    usuarioRoutes, 
    hospitalRoutes, 
    medicoRoutes, 
    searchRoutes,
    uploadsRoutes
];

module.exports = ROUTES;
