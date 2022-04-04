const salas = require('../data/salas.json')

// encontrar todas las salas
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(salas);
    })
}


// encontrar una sala por su id
function findById(id) {
    return new Promise((resolve, reject) => {
        const sala = salas.find((s) => s.id === id);
        resolve(sala);
    })
}

// Comprobar cuandos jugadores hay en una sala
async function jugadoresSala(id) {
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
}

module.exports = {
    findAll,
    findById

}