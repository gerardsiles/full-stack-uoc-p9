const express = require("express");
const router = express.Router();
const {
  getSalas,
  agregarJugador,
  renderRooms,
}
= require("../controllers/salaController");
const protect  = require("../middleware/authMiddleware");
// en el get hay que meter protect como segundo parametro, para evitar que accedan si
// no han iniciado sesion .get('/rooms', protect, funcion para cargar rooms)

// los routes deberian estar en el src, a la misma altura que controlador, data...
router.get('/rooms', protect, renderRooms);

//   .post((req, res) => {});
// en post crea una partidca
router.get("/rooms/:roomnumber",protect,(req, res) => {
    let roomNumber = req.params.roomnumber;
    res.sendFile("/public/views/room" + roomNumber + ".html", { root: "./" });
  })
  .post((req, res) => {});

router.get("/api/v2/getRoomsInfo",protect,getSalas);
router.route("/api/v2/rooms").post(agregarJugador);


//Export
module.exports = router;
