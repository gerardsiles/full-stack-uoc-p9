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
    console.log(room);
    let { id, nombre, jugadores, jugador1, jugador2 } = room;

    if (jugadores === 0) {
      console.log("entra aqui 0");
      jugador1 = username;
      jugadores += 1;
      console.log("jugadores: " + jugadores);
    } else {
      console.log("entra aqui 1");
      jugador2 = username;
      jugadores++;
    }
    let updatedRoom = room;
    console.log("updated Room" + updatedRoom);
    resolve(updatedRoom);
  });
}

module.exports = {
  findAll,
  findById,
  jugadoresSala,
  addPlayerRoom,
};
