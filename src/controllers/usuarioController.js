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
 async function checkIfExist(email, pass){


    var userExists = await Usuario.userExists(email,pass);
    //console.log("userExists: "+ userExists);
    return userExists;


 }
// cargar vista

async function createUsuario(user, email, pass) {
    try {
        // TODO
        // llamar al modelo para crear un usuario
        await Usuario.createUser(user, email, pass);


    } catch (error) {
        console.log(error);
    }
}
// Definir que funciones exporta el controlador
module.exports = {
    getUsuarios,
    createUsuario,
    checkIfExist
}