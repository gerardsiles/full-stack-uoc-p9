const express = require("express");
const router = express.Router();
const { createUsuario } = require("../controllers/usuarioController");

router
  .route("/register")
  .get((req, res) => {
    res.sendFile("/public/views/register.html", { root: "./" });
  })
  .post(createUsuario);

module.exports = router;
