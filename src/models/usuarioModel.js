// Importar usuarios en array
const usuarios = require('../data/usuarios')
const Usuario = require("./Usuario");
const fs = require('fs');

const { writeDataToFile } = require('../utils/userUtils');

async function findAll() {
    // al trabajar con datos, devolvemos una promesa
    return new Promise((resolve, reject) => {
        resolve(usuarios);
    })
}
// econtrar si un nombre de usuario existe
function usernameExists(username) {
    return(usuarios.some((u) => u.username === username));
}
// encontrar a un usuario por su username
async function findByUsername(username) {
    return new Promise((resolve, reject) => {
        const usuario = usuarios.find((u) => u.username === username);
        resolve(usuario);
    })
}

// encontrar a un usuario por su email
async function findByEmail(email) {
    return new Promise((resolve, reject) => {
        const usuario = usuarios.find((u) => u.email === email)
        //console.log(sala);
        resolve(usuario);
    })
}


// crear un nuevo usuario en usuarios.json
async function create(user) {
    let u =  new Promise((resolve,reject) => {
        const newUser = user;
        const username = user.username;
        // comprobar que no existe antes de de crearlo
        if(!usernameExists(username)) {
            usuarios.push(newUser);
            // llamamos al utility para agregar los datos a la array
            writeDataToFile('./src/data/usuarios.json', usuarios);
            resolve(newUser);
        } else {
            reject("El usuario ya existe")
        }

    })
    u.then((message) => {
        console.log(message)
    }). catch((message) => {
        console.log(message)
    })
}

// Definir que funciones exporta el modelo
module.exports = {
    usernameExists,
    findAll,
    findByUsername,
    findByEmail,
    create
}