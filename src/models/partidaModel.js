const Partida = require("../data/partidas.json");
const Game = require("../data/gameState.json");
const Sala = require("../models/salaModel");
const Jugador = require("../models/usuarioModel");
const asyncHandler = require("express-async-handler");

/* Crear un state de partida global para que sea accesible por varios jugadores */
const state = {};
/* tabla para encontrar la partida del usuario entre las existentes */
const clientRooms = {};

// encontrar todas las partidas
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(Partida);
  });
}

// encontrar partida por su id
function findById(id) {
  return new Promise((resolve, reject) => {
    const partida = Partida.find((p) => p.id === id);
    resolve(partida);
  });
}

// encontrar el ultimo id de partida
function getLastID() {
  return new Promise((resolve, reject) => {
    // encontramos el ultimo id en la array
    const id = Partida.seats[Partida.seats.lenght - 1].id;
    // incrementamos el valor en 1
    id++;
    resolve(id);
  });
}

// agregar un jugador a la sala para la partida
async function agregarJugador(username, idSala) {
  var jugador = Jugador.findByUsername(username);
  let sala = findById(idPartida);

  if (!partida.jugador1) {
    partida.jugador1 = jugador;
  } else {
    partida.jugador2 = jugador;
  }
}
// crear una nueva partida
function create(idSala, username1, username2) {
  // declaramos un objeto vacio
  const partida = {};

  return new Promise((resolve, reject) => {
    // obtenemos los parametros necesarios
    const id = getLastID();
    const sala = Sala.findById(idSala);
    const jugador1 = Usuario.findByUsername(username1);
    const jugador2 = Usuario.findByUsername(username2);

    // creamos la partida
    partida = new Partida(id, sala, jugador1, jugador2);
  });
}

function returnGameState() {
  const gameState = {
    matchId: 0,
    roomId: 0,
    /* player1 and player2 */
    playerOne: {
      id: 0,
      username: "",
      cellsConquered: 0,
      color: "",
    },
    playerTwo: {
      id: 0,
      username: "",
      cellsConquered: 0,
      color: "",
    },
    gameboard: [
      [
        { x: 0, y: 0, color: "transparent" },
        { x: 110, y: 0, color: "transparent" },
        { x: 220, y: 0, color: "transparent" },
        { x: 330, y: 0, color: "transparent" },
        { x: 440, y: 0, color: "transparent" },
        { x: 550, y: 0, color: "transparent" },
      ],
      [
        { x: 0, y: 110, color: "transparent" },
        { x: 110, y: 110, color: "transparent" },
        { x: 220, y: 110, color: "transparent" },
        { x: 330, y: 110, color: "transparent" },
        { x: 440, y: 110, color: "transparent" },
        { x: 550, y: 110, color: "transparent" },
      ],
      [
        { x: 0, y: 220, color: "transparent" },
        { x: 110, y: 220, color: "transparent" },
        { x: 220, y: 220, color: "transparent" },
        { x: 330, y: 220, color: "transparent" },
        { x: 440, y: 220, color: "transparent" },
        { x: 550, y: 220, color: "transparent" },
      ],
      [
        { x: 0, y: 330, color: "transparent" },
        { x: 110, y: 330, color: "transparent" },
        { x: 220, y: 330, color: "transparent" },
        { x: 330, y: 330, color: "transparent" },
        { x: 440, y: 330, color: "transparent" },
        { x: 550, y: 330, color: "transparent" },
      ],
      [
        { x: 0, y: 440, color: "transparent" },
        { x: 110, y: 440, color: "transparent" },
        { x: 220, y: 440, color: "transparent" },
        { x: 330, y: 440, color: "transparent" },
        { x: 440, y: 440, color: "transparent" },
        { x: 550, y: 440, color: "transparent" },
      ],
      [
        { x: 0, y: 550, color: "transparent" },
        { x: 110, y: 550, color: "transparent" },
        { x: 220, y: 550, color: "transparent" },
        { x: 330, y: 550, color: "transparent" },
        { x: 440, y: 550, color: "transparent" },
        { x: 550, y: 550, color: "transparent" },
      ],
    ],
    gridsize: 6,
    cellsConquered: 0,
  };

  /* generar un color aleatorio y asignarselo al jugador */
  const userColor = createRandomColor(gameState);
  gameState.playerOne.color = userColor;

  return gameState;
}

/* Funcion para generar un color aleatorio para el jugador */
const createRandomColor = (state) => {
  var letters = "0123456789ABCDEF";
  var randomColor = "#";
  for (var i = 0; i < 6; i++) {
    randomColor += letters[Math.floor(Math.random() * 16)];
  }
  //   state.playerOne.color = randomColor;
  //   state.playerTwo.color = randomColor;
  return randomColor;
};

module.exports = { returnGameState };
