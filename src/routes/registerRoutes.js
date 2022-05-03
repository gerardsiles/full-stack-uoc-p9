const express = require("express");
const router = express.Router();
const { createUsuario } = require("../controllers/usuarioController");

router
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post(createUsuario);

module.exports = router;
