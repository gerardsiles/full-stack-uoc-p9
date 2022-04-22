const express = require("express");
const router = express.Router();
const {
  getSalas,
  agregarJugador,
} = require("../src/controllers/salaController");
// const { protect } = require("../middleware/authMiddleware");
// en el get hay que meter protect como segundo parametro, para evitar que accedan si
// no han iniciado sesion .get('/rooms', protect, funcion para cargar rooms)

// los routes deberian estar en el src, a la misma altura que controlador, data...
router
  .route("/rooms")
  .get((req, res) => {
    res.sendFile("/public/views/register.html", { root: "./" });
  })
  .post((req, res) => {});

router
  .route("/rooms/:roomnumber")
  .get((req, res) => {
    let roomNumber = req.params.roomnumber;
    res.sendFile("/public/views/room"+ roomNumber + ".html", { root: "./" });
  })
  .post((req, res) => {});

router.route("/api/v2/getRoomsInfo").get(getSalas);
router.route("/api/v2/rooms").post(agregarJugador);
module.exports = router;
