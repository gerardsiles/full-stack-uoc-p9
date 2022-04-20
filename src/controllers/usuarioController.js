const Usuario = require("../models/usuarioModel");

// find devulve una promesa, al llamarlo lo hacemos con una funcion asincrona
async function getUsuarios(req, res) {
  try {
    // llamamos al modelo para deolvernos los usuarios
    const usuarios = await Usuario.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(usuarios));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

// encontrar un usuario por su nombre de usuario
async function getUsuarioByUsername(req, res, username) {
  try {
    const usuario = await Usuario.findByUsername(username);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuario));
  } catch (error) {
    console.log(error);
  }
}

async function getUsuarioByEmail(req, res, email) {
  try {
    const user = await Usuario.findByEmail(email);

    /* res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));*/
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function createUsuario(req, res) {
  // objeto js con la informacion encontrada en el req
  const { username, email, password } = req.body;
  const usernameExists = await Usuario.usernameExists(username);
  const emailExists = await Usuario.emailExists(email);
  // si el usuario ya existe, informamos del error
  if (usernameExists) {
    res.status(400);
    console.log("Este nombre de usuario ya existe");
  }
  if (emailExists) {
    res.status(400);
    console.log("Este email ya esta registrado");
  }
  // crear json con la informacion del usuario
  const usuario = {
    username,
    email,
    password,
  };
  // Crear al usuario
  if (!usernameExists && !emailExists) {
    // escribir la informacion del head
    const newUsuario = await Usuario.create(usuario);
    console.log(newUsuario);
    if (newUsuario) {
      res.redirect("/login"); // probar el redireccionar despues de register
      //       res.writeHead(201, { "Content-Type": "application/json" });
      //       return res.end(JSON.stringify(newUsuario));
    } else {
      res.status(400);
      console.log("Informacion de usuario incorrecta");
    }
  }
}

async function login(req, res) {
  // find if there is a cookie present
  // .then(function) if there is no cookie, login
  const { email, password } = req.body;
}
// Definir que funciones exporta el controlador
module.exports = {
  getUsuarios,
  getUsuarioByEmail,
  getUsuarioByUsername,
  createUsuario,
  login,
};
