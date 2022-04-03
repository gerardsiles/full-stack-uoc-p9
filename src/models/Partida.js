const Usuario = require('../models/usuarioModel')
const Sala = require('../models/partidaModel')


module.exports = class Partida {
    constructor(idPartida, sala, jugador1, jugador2){
        this.idPartida = idPartida;
        this.sala = sala;
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
    }
}