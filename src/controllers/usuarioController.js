const Usuario = require('../models/usuarioModel')

// find devulve una promesa, al llamarlo lo hacemos con una funcion asincrona
async function getUsuarios(req, res) {
    try {
        // llamamos al modelo para deolvernos los usuarios
        const usuarios = await Usuario.findAll();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(usuarios));
        res.end();
    } catch (error){
        console.log(error);
    }
}

// cargar vista

async function createUsuario(req, res) {
    try {
        // TODO
        // llamar al modelo para crear un usuario
    } catch (error) {

    }
}
// Definir que funciones exporta el controlador
module.exports = {
    getUsuarios,
    createUsuario
}