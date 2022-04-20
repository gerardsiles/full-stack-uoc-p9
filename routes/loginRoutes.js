const express = require("express");
const router = express.Router();

const { login } = require("../src/controllers/usuarioController");

router
  .route("/login")
  .get((req, res) => {
    res.render("login");
    //res.sendFile("/public/views/login.html", { root: "./" });
  })
  .post(login);

module.exports = router;
