const express = require("express");
const router = express.Router();
const {
  getSalas,
  agregarJugador,
  renderRooms,
} = require("../controllers/salaController");
const protect = require("../middleware/authMiddleware");
// en el get hay que meter protect como segundo parametro, para evitar que accedan si
// no han iniciado sesion .get('/rooms', protect, funcion para cargar rooms)

router.get("/rooms", renderRooms);

//   .post((req, res) => {});
// en post crea una partida
router
  .get("/rooms/:roomNumber", (req, res) => {
    res.render(`room${req.params.roomNumber}`);
  })
  .post((req, res) => {});

router.route("/api/v2/rooms").post(agregarJugador);

//Export
module.exports = router;
