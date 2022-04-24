const Partida = require("../data/partidas.json");
const Sala = require("../models/salaModel");
const Jugador = require("../models/usuarioModel");

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
