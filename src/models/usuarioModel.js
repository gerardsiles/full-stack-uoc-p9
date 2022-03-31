// Importar usuarios en array
const usuarios = require('../data/usuarios.json')

function findAll() {
    // al trabajar con datos, devolvemos una promesa
    return new Promise((resolve, reject) => {
        resolve(usuarios);
    })
}

function createUser(data) {
    return new Promise((resolve, reject) => {
        //TODO
        // recibir informacion para crear al usuario
        // agregarlo a la array en data
        resolve(usuarios.push(data));
    })
}

// Definir que funciones exporta el modelo
module.exports = {
    findAll,
    createUser
}