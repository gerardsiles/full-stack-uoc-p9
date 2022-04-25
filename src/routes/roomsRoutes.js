const express = require("express");
const router = express.Router();
const {
  getSalas,
  agregarJugador,
  renderRooms,
} = require("../controllers/salaController");
const protect = require("../middleware/authMiddleware");

router.get("/rooms", renderRooms);

//   .post((req, res) => {});
// en post crea una partida
router
  .get("/rooms/:roomNumber", (req, res) => {
    res.render(`room${req.params.roomNumber}`);
  })
  .post((req, res) => {});

router.route("/api/v2/rooms").post(agregarJugador);
router.route("/api/v2/getRoomsInfo").get(getSalas);

//Export
module.exports = router;
