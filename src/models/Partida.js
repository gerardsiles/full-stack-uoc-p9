const Usuario = require('../models/usuarioModel')
const Sala = require('../models/partidaModel')


module.exports = class Partida {
    constructor(idPartida, sala, jugador1, jugador2){
        this.idPartida = idPartida;
        this.sala = sala;
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
    }

    getId() {
        return this.idPartida;
    }

    getSalaId() {
        return this.sala.getId();
    }

    getJugador1() {
        return this.jugador1;
    }

    getJugador2() {
        return this.jugador2;
    }

    iniciarPartida() {
        if (this.sala.getJugadores() === 2) {
            return new Partida;
        }
    }

    // una partida solo se inicia si la sala se ha llenado, asi que no hacen falta setters ya que sus valores no son modificables
}