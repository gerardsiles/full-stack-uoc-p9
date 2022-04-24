// Importar usuarios en array
const usuarios = require("../data/usuarios");
const Usuario = require("./Usuario");
const fs = require("fs");

const { writeDataToFile } = require("../utils/userUtils");

async function findAll() {
  // al trabajar con datos, devolvemos una promesa
  return new Promise((resolve, reject) => {
    resolve(usuarios);
  });
}
// econtrar si un nombre de usuario existe
function usernameExists(username) {
  return usuarios.some((u) => u.username === username);
}

function emailExists(email) {
  return usuarios.some((u) => u.email === email);
}
// encontrar a un usuario por su username
async function findByUsername(username) {
  return new Promise((resolve, reject) => {
    const usuario = usuarios.find((u) => u.username === username);
    resolve(usuario);
  });
}

// encontrar a un usuario por su email
async function findByEmail(email) {
  return new Promise((resolve, reject) => {
    const user = usuarios.find((u) => u.email === email);
    resolve(user);
  });
}

// crear un nuevo usuario en usuarios.json
async function create(user) {
  return new Promise((resolve, reject) => {
    const { username, email, password } = user;
    const newUser = { username, email, password };
    usuarios.push(newUser);

    // llamamos al utility para agregar los datos a la array
    writeDataToFile("./src/data/usuarios.json", usuarios);
    resolve(newUser);
  });
}

// Definir que funciones exporta el modelo
module.exports = {
  usernameExists,
  emailExists,
  findAll,
  findByUsername,
  findByEmail,
  create,
};
