const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const {
  getSalas,
  roomsAction,
  renderRooms,
} = require("../controllers/salaController");
const {
  createGameState,
  gameLoop,
  updateState,
} = require("../controllers/partidaController");
const { protect } = require("../middleware/authMiddleware");

router.get("/rooms", renderRooms);

//   .post((req, res) => {});
// en post crea una partida
router
  .get("/rooms/:roomNumber", (req, res) => {
    var io = req.app.get("socketio");

    io.on("connection", (client) => {
      let state = createGameState();

      /* Al recibir del cliente el evento click con el raton */
      client.on("mousedown", handleMouseDown);

      function handleMouseDown(keyCode) {
        try {
          /* Parseamos los valores recibidos de las coordenadas */
          keyCodeX = parseInt(keyCode.x);
          keyCodeY = parseInt(keyCode.y);

          updateState(keyCodeX, keyCodeY, state);
        } catch (e) {
          console.log(e);
          return;
        }
      }
      startGameInterval(client, state);
    });

    function startGameInterval(client, state) {
      const intervalId = setInterval(() => {
        const winner = gameLoop(state);

        //         if (!winner) {

        client.emit("gameState", JSON.stringify(state));
        //         } else {
        //           client.emit(intervalId);
        //         }
      }, 1000 / 10);
    }
    res.render(`room${req.params.roomNumber}`);
  })
  .post((req, res) => {});

router.route("/api/v2/rooms").post(roomsAction);
router.route("/api/v2/getRoomsInfo").get(getSalas);

//Export
module.exports = router;
