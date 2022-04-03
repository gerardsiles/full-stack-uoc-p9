const Partida = require ('../models/partidaModel');


// encontrar todas las partidas
async function getPartidas(req, res) {
    try{
        const partidas = await Partida.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(salas));
    } catch (error) {
        console.log(error);
    }
}

// devuelve una partida en concreto
async function getPartida(req, res, id) {
    try{
        const partida = await Partida.findById(id);

        // comprobar si la partida existe
        if(!partida) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({message: 'Partida no encontrada'}));
        } else {
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify(sala));
        }
    } catch (error) {
        console.log(error);
    }
}

async function crearPartida(req, res, idSala, username1, username2) {
    try{
        Partida.create(idSala, username1, username2);
    } catch (error) {

    }
}

async function iniciarPartida() {
//todo
}
async function finalizarPartida() {
//todo
}

module.exports = {
    getPartidas,
    getPartida,
    crearPartida
}