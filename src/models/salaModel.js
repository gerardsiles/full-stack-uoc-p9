const salas = require('../data/salas.json')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(salas);
    })
}


function findById(id) {
    return new Promise((resolve, reject) => {
        const sala = salas.find((s) => s.id === id);
        resolve(sala);
    })
}


async function create(nombreSala) {

}

module.exports = {
    findAll,
    findById,
    create
}