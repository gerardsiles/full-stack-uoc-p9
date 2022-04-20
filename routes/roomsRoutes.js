const express = require("express");
const router = express.Router();
const { getSalas } = require("../src/controllers/salaController");
// const { protect } = require("../middleware/authMiddleware");
// en el get hay que meter protect como segundo parametro, para evitar que accedan si
// no han iniciado sesion .get('/rooms', protect, funcion para cargar rooms)

// los routes deberian estar en el src, a la misma altura que controlador, data...
router
  .route("/rooms")
  .get((req, res) => {
    res.sendFile(__dirname.replace("\\routes", "") + "/public/views/room.html");
  })
  .post((req, res) => {});

router
  .route("/rooms/:roomnumber")
  .get((req, res) => {
    let roomNumber = req.params.roomnumber;
    res.sendFile(
      __dirname.replace("\\routes", "") +
        "/public/views/room" +
        roomNumber +
        ".html"
    );
  })
  .post((req, res) => {});

router.route("/api/v2/getRoomsInfo").get(getSalas);
module.exports = router;
