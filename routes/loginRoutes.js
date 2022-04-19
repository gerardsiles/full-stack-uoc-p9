const express = require("express");
const router = express.Router();
const path = require("path");

const { getUsuarioByEmail } = require("../src/controllers/usuarioController");


router
  .route("/login")
  .get((req, res) => {
    res.sendFile("/public/views/login.html", { root: "./" });
  })
  .post(async (req, res) => {
    let useremail = req.body.email;
    const user = await getUsuarioByEmail(req, res, useremail);
    if (user) {
      res.status(200).json({ success: true, data: user });
    } else {
      console.log("Usuario no encontrado");
    }
  });

module.exports = router;
