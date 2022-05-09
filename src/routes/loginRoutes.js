const express = require("express");
const router = express.Router();

const { login, renderLogin } = require("../controllers/usuarioController");

router.route("/").get(renderLogin).post(login);
router.route("/login").get(renderLogin).post(login);
router.route("/logout");

router.route("/api/v2/login").post(login);
module.exports = router;
