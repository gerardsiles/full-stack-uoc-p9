const express = require("express");
const router = express.Router();

const { login, renderLogin } = require("../controllers/usuarioController");


router.route("/")
    .get(renderLogin)
    .post(login);
router.route("/login")
    .get(renderLogin)
    .post(login);

module.exports = router;
