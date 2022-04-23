const express = require("express");
const router = express.Router();

const { login, renderLogin } = require("../controllers/usuarioController");

router.route("/login")
    .get(renderLogin)
    .post(login);

module.exports = router;
