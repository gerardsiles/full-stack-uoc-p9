const Usuario = require("../models/usuarioModel");
const User = require("../models/usuarioSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  // objeto js con la informacion encontrada en el req
  const { username, email, password } = req.body;
  // validar la informacion recibida
  const usernameExists = await Usuario.usernameExists(username);
  const emailExists = await Usuario.emailExists(email);
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
    const newUser = await Usuario.create(usuario);

    if (newUser) {
      res.status(201).json({
        username: newUser.username,
        email: newUser.email,
        token: generateToken(user.username),
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
  const user = await Usuario.findByEmail(email);

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.username = user.username;

    res.status(201).json({
      username: user.username,
      email: user.email,
      token: generateToken(user.username),
    });
  } else {
    res.status(400).json({
      success: false,
      msg: "Credenciales no validas",
    });
  }
});

// Generate JWT token
const generateToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const logout = asyncHandler(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.render("rooms");
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
