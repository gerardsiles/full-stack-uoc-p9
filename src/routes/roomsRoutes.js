const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { socketConnection } = require("../utils/gameSocketUtils");
const Sala = require("../models/Sala");
const Partida = require("../models/Partida");

const { findById } = require("../models/salaModel");

/* Crear un state de partida global para que sea accesible por varios jugadores */
const state = {};
/* tabla para encontrar la partida del usuario entre las existentes */
const clientRooms = {};

const playerOne = {};
const playerTwo = {};
let playerNumber;

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
  handleJoinGame,
} = require("../controllers/partidaController");

const { protect } = require("../middleware/authMiddleware");

router.get("/rooms", protect, renderRooms);

/* Rutas y socket.io */

//   .post((req, res) => {});
// en post crea una partida
router
  .get("/rooms/:roomNumber", protect, (req, res) => {
    var io = req.app.get("socketio");

    io.on("connection", (client) => {
      //       let state = createGameState();
      /* Al recibir del cliente el evento click con el raton */
      client.on("mousedown", handleMouseDown);
      client.on("joinGame", handleJoinGame);

      function handleJoinGame(gameId, username, _id) {
        const room = io.sockets.adapter.rooms[gameId]; // conseguir informacion de la room
        let roomExist;
        console.log(clientRooms);
        console.log(roomExist);
        Object.entries(clientRooms).forEach(([key, value]) => {
          if (value === gameId) {
            console.log(`encontrado game: ${gameId}`);
            roomExist = true;
          }
        });
        console.log(roomExist);
        /* si es el primer jugador */
        if (!roomExist) {
          //client.emit('playerOne');
          // return

          clientRooms[client.id] = gameId;
          state[gameId] = initGame(username, _id);

          client.join(gameId);
          playerNumber++;
          client.number = Math.floor(playerNumber % 2);
          client.emit("init", 1);
          console.log(clientRooms);

          return;
        } else {
          //           let allUsers;
          //           if (roomExist) {
          //             // si existe la room
          //             allUsers = room.sockets; // Comprobar cuantos jugadores hay en la sala
          //           }
          //           let numClients = 0;
          //           if (allUsers) {
          //             numClients = Object.keys(allUsers).length;
          //           }
          //
          //           if (numClients === 0) {
          //             client.emit("unknownGame");
          //             return;
          //           } else if (numClinets > 1) {
          //             client.emit("tooManyPlayers");
          //             return;
          //           } else {
          roomExist = false;
          clientRooms[client.id] = gameId;
          client.join(gameId);
          playerNumber++;
          client.number = Math.floor(playerNumber % 2);
          /* Agregar al jugador a la pardita */
          state[gameId].joinPlayerTwo(username, _id);
          console.log(client.number);
          client.emit("init", 2);
          startGameInterval(gameId);
          console.log(roomExist);
          //           }
        }
      }
      function handleMouseDown(keyCode) {
        const roomName = clientRooms[client.id];
        if (!roomName) {
          return;
        }
        try {
          /* Parseamos los valores recibidos de las coordenadas */
          keyCodeX = parseInt(keyCode.x);
          keyCodeY = parseInt(keyCode.y);
          /* conseguir que jugador es el que ha hecho el click */
          let player = keyCode.player;
          console.log(player);

          console.info(`Player index is ${player}`);
          updateState(keyCodeX, keyCodeY, state[roomName], player);
        } catch (e) {
          console.log(e);
          return;
        }
      }
    });

    function startGameInterval(roomName) {
      const intervalId = setInterval(() => {
        const winner = gameLoop(state[roomName]);

        if (!winner) {
          emitGameState(roomName, state[roomName]);
        } else {
          console.info(`socket: gana el jugador${winner}`);
          emitGameOver(roomName, winner);
          state[roomName] = null;
          clearInterval(intervalId);
        }
      }, 1000 / 10);
    }
    function emitGameState(roomName, state) {
      io.sockets.in(roomName).emit("gameState", JSON.stringify(state));
    }

    function emitGameOver(roomName, winner) {
      console.info("Emitiendo fin de partida, ganador: " + winner);
      io.sockets.in(roomName).emit("gameOver", JSON.stringify({ winner }));
    }
    res.render(`room${req.params.roomNumber}`);
  })
  .post((req, res) => {});

router.route("/api/v2/rooms/addPlayer").post(agregarJugador);
router.route("/api/v2/rooms/removePlayer").post(quitarJugador);
router.route("/api/v2/getRoomsInfo").get(getSalas);

//Export
module.exports = router;
