// Importar usuarios en array
const usuarios = require('../data/usuarios.json')
const Usuario = require("./Usuario");
const fs = require('fs');

async function findAll() {
    // al trabajar con datos, devolvemos una promesa
    return new Promise((resolve, reject) => {
        resolve(usuarios);
    })
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


async function create(usuario) {

    return new Promise((resolve,reject) => {
        const newUser = {user};
        const username = usuario.username;
        if (!findByUsername(username)){
            usuarios.push(newUser);
//          fs.writeFileSync('../data/usuarios.json', usuario);
            resolve(newUser);
        }
    });

}

// Definir que funciones exporta el modelo
module.exports = {
    findAll,
    findByUsername,
    findByEmail,
//    userExists,
    create
}