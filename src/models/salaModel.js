const salas = require("../data/salas.json");
const Sala = require("./Sala");

// encontrar todas las salas
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(salas);
  });
}

// encontrar una sala por su id
function findById(id) {
  return new Promise((resolve, reject) => {
    const sala = salas.find((s) => s.id === id);
    resolve(sala);
  });
}

// Comprobar cuantos jugadores hay en una sala
async function jugadoresSala(id) {
  return new Promise((resolve, reject) => {
    let sala = findById(id);
    let s = JSON.parse(myJSON);
    let jugadores = 0;
    // si hay un jugador1 sumamos jugadores
    let jugador1 = s.jugador1;
    if (jugador1) {
      jugadores++;
    }
    let jugador2 = s.jugador2;
    if (jugador2) {
      jugadores++;
    }
    resolve(jugadores);
  });
}

async function addPlayerRoom(room, username) {
  let r = new Promise((resolve, reject) => {
    let { id, name, players, player1, player2 } = room;
    let updatedRoom = room;

    if (players === 0) {
      for (var i = 0; i < salas.length; i++) {
        if (salas[i].id == id) {
          salas[i].players = 1;
          salas[i].playerOne = username;
          resolve(salas);
        }
      }
    } else {
      for (var i = 0; i < salas.length; i++) {
        if (salas[i].id == id) {
          salas[i].players = 2;
          salas[i].playerTwo = username;
          resolve(salas[i]);
        }
      }
    }
    resolve(salas);
  });
}

async function removePlayerRoom(room, username) {
  let r = new Promise((resolve, reject) => {
    let { id, name, players, player1, player2 } = room;
    let updatedRoom = room;

    if (players === 1) {
      for (var i = 0; i < salas.length; i++) {
        if (salas[i].id == id) {
          salas[i].players = 0;
          salas[i].player1 = "";
          resolve(salas[i]);
        }
      }
    } else {
      for (var i = 0; i < salas.length; i++) {
        if (salas[i].id == id) {
          salas[i].players = 1;
          console.log(JSON.stringify(salas[i].player2));
          salas[i].player2 = "";
          resolve(salas[i]);
        }
      }
    }
    resolve(salas);
  });
}

module.exports = {
  findAll,
  findById,
  jugadoresSala,
  addPlayerRoom,
  removePlayerRoom,
};
