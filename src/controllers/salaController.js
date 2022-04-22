const modelo = require("../models/salaModel");

// devuelve todas las salas
async function getSalas(req, res) {
  try {
    const salas = await modelo.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(salas));
  } catch (error) {
    console.log(error);
  }
}

// devuelve una sala en concreto
async function getSala(req, res, id) {
  try {
    const sala = await modelo.findById(id);

    // comprobar si el producto existe
    if (!sala) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Sala no encontrada" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(sala));
    }
  } catch (error) {
    console.log(error);
  }
}

function jugadoresEnSala(sala) {
  //todo
  // buscar cuantos jugadores hay en la sala y devolver un numero
}

// @desc Agregar un jugador a la sala
// @method POST api/v2/rooms
// @access public
async function agregarJugador(req, res) {
  const { username, id } = req.body;
  const room = await modelo.findById(id);
  const sala = modelo.addPlayerRoom(room, username);
  console.log(sala);
  res.end(JSON.stringify(sala));
}

module.exports = {
  getSalas,
  getSala,
  jugadoresEnSala,
  agregarJugador,
};
