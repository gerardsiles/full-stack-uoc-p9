const Room = require("../models/salaModel");

// devuelve todas las salas
async function getSalas(req, res) {
  try {
    const salas = await Room.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(salas));
  } catch (error) {
    console.log(error);
  }
}

// devuelve una sala en concreto
async function getSala(req, res, id) {
  try {
    const sala = await Room.findById(id);

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
  const room = await Room.findById(id);
  const sala = await Room.addPlayerRoom(room, username);
  console.log(sala);
  res.end(JSON.stringify(sala));
}
// @desc cargar la vista de rooms
// @route GET /rooms
// @access public
async function renderRooms(req, res) {
  res.render("rooms");
}
module.exports = {
  getSalas,
  getSala,
  jugadoresEnSala,
  agregarJugador,
  renderRooms,
};
