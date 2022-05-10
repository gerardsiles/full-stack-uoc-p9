const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { socketConnection } = require("../utils/roomUtils");

/* Crear un state de partida global para que sea accesible por varios jugadores */
const state = {};
/* tabla para encontrar la partida del usuario entre las existentes */
const clientRooms = {};

const {
  getSalas,
  roomsAction,
  renderRooms,
  createRoomState,
  roomLoop,
  agregarJugador,
  quitarJugador,
} = require("../controllers/salaController");

const {
  createGameState,
  gameLoop,
  updateState,
  initGame,
} = require("../controllers/partidaController");

const { protect } = require("../middleware/authMiddleware");

router.get("/rooms", protect, renderRooms);

/* Rutas y socket.io */

router.get("/rooms", (req, res) => {
  console.log(req.session.username);
  req.session.isAuth = true;
  var io = req.app.get("socketio");

  io.on("connection", async (client) => {
    const state = await createRoomState();
    client.on("addPlayer", handleAddPlayer);
    client.on("removePlayer", handleRemovePlayer);
    client.on("joinGame", handleJoinGame);

    startRoomInterval(client, state);
  });

  async function handleJoinGame() {
    let roomName = makeid(5);
    clientRooms[client.id] = roomName;
    client.emit("gameCode", roomName);

    state[roomName] = createGameState();
    client.join(roomName);
    client.number = state.playerOne;
    // comprobar si el usuario que pinca es el usuario uno o dos
    // para luego emitir la room con el jugador
    //     if(state.playerOne === username)
    client.emit("init", client.number);
    clientRooms[client.id] = roomName;
    client.join(roomName);
  }
  async function handleAddPlayer(data) {
    let roomId = data.roomId;
    let username = data.username;

    await agregarJugador(roomId, username);
    console.log(data);
  }

  async function handleRemovePlayer(data) {
    let roomId = data.roomId;
    let username = data.username;

    await quitarJugador(roomId, username);
  }

  function startRoomInterval(client, state) {
    const intervalId = setInterval(() => {
      const gameReady = roomLoop(state);

      client.emit("roomState", state);
    }, 1000 / 5);
  }
  res.render("rooms", { username: "prueba" });
});

//   .post((req, res) => {});
// en post crea una partida
router
  .get("/rooms/:roomNumber", protect, (req, res) => {
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

        if (!winner) {
          client.emit("gameState", JSON.stringify(state));
        } else {
          client.emit(intervalId);
        }
      }, 1000 / 10);
    }
    res.render(`room${req.params.roomNumber}`);
  })
  .post((req, res) => {});

router.route("/api/v2/rooms/addPlayer").post(agregarJugador);
router.route("/api/v2/rooms/removePlayer").post(quitarJugador);
router.route("/api/v2/getRoomsInfo").get(getSalas);

//Export
module.exports = router;
