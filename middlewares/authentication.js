// Imports
const jwt = require('jsonwebtoken');
const params = require('../global/params');

// =======================================================
// Generar Token
// =======================================================

exports.generateToken = (payload, time) => {
    return jwt.sign({usuario: payload},
                    params.SEED,
                    {expiresIn: time});
}

// =======================================================
// Verificar token
// =======================================================
exports.verifyToken = (req, res, next) => {
    try {
        const auth = req.get('authorization');
        const token = auth.split('Bearer ')[1];

        jwt.verify(token, params.SEED, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid Token!',
                    error: error
                });
            }

            req.usuario = decoded.usuario;
            next();
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Autenticación fallida, es necesario enviar el token de autenticación',
            error: error
        })
    }
}
