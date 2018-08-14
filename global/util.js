const fs = require('fs');

// =======================================================
// Verificar si existe dentro de un arreglo de parametros
// =======================================================
exports.findInArray = (array, element) => {
    return array.indexOf(element) >= 0;
};

// =======================================================
// Remover archivo si existe dentro del directorio
// =======================================================
exports.removeIfExists = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};

// =======================================================
// Obtener formato de archivo
// =======================================================
exports.getFileExtension = (filename) => {
    let array = filename.split('.');
    return array[array.length - 1];
};

// =======================================================
// Setear nombre unico de archivo
// =======================================================
exports.setUniqueFileName = (id, extension) => {
    return `${id}-${new Date().getMilliseconds()}.${extension}`;
};
