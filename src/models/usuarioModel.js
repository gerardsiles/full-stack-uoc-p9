// Importar usuarios en array
const usuarios = require('../data/usuarios.json')
const Usuario = require("./Usuario");
const fs = require('fs');

function findAll() {
    // al trabajar con datos, devolvemos una promesa
    return new Promise((resolve, reject) => {
        resolve(usuarios);
    })
}

async function userExists(email,pass){
    var userRegistered =false;

    new Promise((resolve, reject) => {
        resolve(usuarios);
    })
    //console.log(usuarios);

    usuarios.forEach((user)=>{
        //Impresion de parámetros del array y del usuario

        /*console.log(user.email);
        console.log(user.password);
        console.log(email);
        console.log(pass);*/

        if(user.email == email && user.password == pass){
            userRegistered = true;
        }
    });
    return userRegistered;

}
async function createUser(user, email, pass) {

    new Promise((resolve, reject) => {
        resolve(usuarios);
    })
    console.log("Nuevo Usuario: " );
    console.log(user);
    console.log(email);
    console.log(pass);
    console.log(typeof(usuarios));
    usuarios.push({
        "username": user,
        "email": email,
        "password": pass
    });
    let data = JSON.stringify(usuarios);
    fs.writeFileSync('C:\\Users\\sapm\\WebstormProjects\\full-stack-uoc-p9\\src\\data\\usuarios.json', data);
    console.log(usuarios);

}

// Definir que funciones exporta el modelo
module.exports = {
    findAll,
    userExists,
    createUser
}