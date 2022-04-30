const { returnGameState } = require("../models/partidaModel");
const asyncHandler = require("express-async-handler");

// encontrar todas las partidas
async function getPartidas(req, res) {
  try {
    const partidas = await Partida.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(salas));
  } catch (error) {
    console.log(error);
  }
}

// devuelve una partida en concreto
async function getPartida(req, res, id) {
  try {
    const partida = await Partida.findById(id);

    // comprobar si la partida existe
    if (!partida) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Partida no encontrada" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(sala));
    }
  } catch (error) {
    console.log(error);
  }
}

async function crearPartida(req, res, idSala, username1, username2) {}

async function iniciarPartida() {
  //todo
}
async function finalizarPartida() {
  //todo
}

const createGameState = () => {
  const state = returnGameState();

  return state;
};

const gameLoop = asyncHandler(async (req, res, state) => {
  if (!state) {
    return;
  }
  const playerOne = state.playerOne;
  /* comprobar si hay un ganador */
  if (state.cellsConquered === 36) {
    if (playerOne.cellsConquered > PlayerTwo.cellsConquered) {
      return 1;
    } else if (playerOne.cellsConquered < PlayerTwo.cellsConquered) {
      return 2;
    } else if (playerOne.cellsConquered === PlayerTwo.cellsConquered) {
      return 3;
    }
  }
  /* si no hay ganador continuamos con el juego */
  return false;
});

/* Al recibir el click del usuario, actualizamos la celda */
const updateState = (keyCodeX, keyCodeY, state) => {
  const squareSize = 110;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      let currentNode = state.gameboard[i][j];

      /* Buscamos el nodo en la matriz con las cordenadas recibidas */
      if (
        keyCodeX > currentNode.x &&
        keyCodeX < currentNode.x + squareSize &&
        keyCodeY > currentNode.y &&
        keyCodeY < currentNode.y + squareSize
      ) {
        /* Si la celda no ha sido conquistada */
        if (currentNode.color === "transparent") {
          // si es el primer cuadrado
          if (state.playerOne.cellsConquered === 0) {
            /* Si la celda no ha sido conquistada todavia actualizamos valores*/

            state.gameboard[i][j].color = state.playerOne.color;
            state.playerOne.cellsConquered++;
            state.cellsConquered++;

            /* Si quedan celdas por conquistar */
          } else if (state.cellsConquered != 36) {
            /* comprobar si los nodos colindantes han sido conquistados por el jugador */
            if (legalMove(state, i, j)) {
              currentNode.color = state.playerOne.color;
              state.playerOne.cellsConquered++;
              state.cellsConquered++;
            }
          }
        }
      }
    }
  }
  console.log(state);
};

/* Comprobar los nodos adyacentes por celdas conquistadas del jugador */
const legalMove = (state, i, j) => {
  for (let k = -1; k <= 1; k++) {
    for (let l = -1; l <= 1; l++) {
      /* Delimitamos los nodos fuera de la matriz */
      if (
        i + k < 0 ||
        i + k > state.gridsize - 1 ||
        j + l < 0 ||
        j + l > state.gridsize - 1
      ) {
        /* si el nodo esta fuera, salimos de la iteracion actual y continuamos */
        continue;
      }
      /* comprobar si hay un nodo conquistado por el jugador */
      if (state.gameboard[i + k][j + l].color == state.playerOne.color) {
        return true;
      }
    }
  }
};
module.exports = {
  getPartidas,
  getPartida,
  crearPartida,
  createGameState,
  gameLoop,
  updateState,
};
