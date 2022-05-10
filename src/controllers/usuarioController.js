const Usuario = require("../models/usuarioModel");
const User = require("../models/usuarioSchema")
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const session = require("express-session");

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

// @desc Registrar a un usuario nuevo
// @route POST /register
// @access public
const createUsuario = asyncHandler(async (req, res) => {
  console.log(req.body);
  // objeto js con la informacion encontrada en el req
  const { username, email, password } = req.body;
  // validar la informacion recibida
  
  const usernameExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });
  // si el usuario ya existe, informamos del error
  if (usernameExists) {
    res.status(400);
    throw new Error("Este nombre de usuario ya existe");
  }
  if (emailExists) {
    res.status(400);
    throw new Error("Este email ya esta registrado");
  }

  // hash contrasena
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // crear json con la informacion del usuario
  const usuario = {
    username,
    email,
    password: hashedPassword,
  };
  // Crear al usuario
  if (!usernameExists && !emailExists) {
    // escribir la informacion del head
    const newUser = await User.create(usuario);

    if (newUser) {
      res.status(201).json({
        username: newUser.username,
        email: newUser.email,
      });
    } else {
      res.status(400);
      console.log("Informacion de usuario incorrecta");
    }
  }
});

// @desc cargar la vista de login
// @route GET /login
// @access public
async function renderLogin(req, res) {
  res.render("login");
}

// @desc login del usuario
// @route POST /login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select(' password email username')

  if(!user){
    return res.status(400);
    throw new Error("Informacion de usuario incorrecta")    
  } else {
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      res.status(400);
      throw new Error("Contraseña incorrecta");
    }else {
      req.session.username = user.username;
      console.log(req.session);
      return res.status(200).send(req.session);
    }
  }
});

const logout = asyncHandler(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("rooms");
    }
    res.clearCookie("sid");
    res.render("login");
  });
});

// Definir que funciones exporta el controlador
module.exports = {
  getUsuarioByEmail,
  getUsuarioByUsername,
  createUsuario,
  renderLogin,
  login,
};
