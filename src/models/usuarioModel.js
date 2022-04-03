// Importar usuarios en array
const usuarios = require('../data/usuarios.json')

async function findAll() {
    // al trabajar con datos, devolvemos una promesa
    return new Promise((resolve, reject) => {
        resolve(usuarios);
    })
}

// encontrar a un usuario por su username
async function findByUsername(username) {
    return new Promise((resolve, reject) => {
        const sala = salas.find((s) => u.username === username);
        resolve(sala);
    })
}

// encontrar a un usuario por su email
async function findByEmail(email) {
    return new Promise((resolve, reject) => {
        const sala = usuarios.find((u) => u.email === email);
        resolve(sala);
    })
}




// async function userExists(email,pass){
//     var userRegistered =false;
//
//     new Promise((resolve, reject) => {
//         resolve(usuarios);
//     })
//     //console.log(usuarios);
//
//     usuarios.forEach((user)=>{
//         //Impresion de parámetros del array y del usuario
//
//         /*console.log(user.email);
//         console.log(user.password);
//         console.log(email);
//         console.log(pass);*/
//
//         if(user.email == email && user.password == pass){
//             userRegistered = true;
//         }
//     });
//     return userRegistered;
//
// }
async function create(usuario) {
    return new Promise((resolve,reject) => {
    const newUser = {user};
    const username = usuario.username;
        if (!findByUsername(username)){
           usuarios.push(newUser);

//            fs.writeFileSync('../data/usuarios.json', usuario);
            resolve(newUser);
        }
    });
}

// Definir que funciones exporta el modelo
module.exports = {
    findAll,
    findByUsername,
    findByEmail,
//     userExists,
    create
}