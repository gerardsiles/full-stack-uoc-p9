module.exports = class Partida {
    constructor(sala, jugador1, jugador2){
        this.sala = sala;
        this.jugador1 = jugador1.username;
        this.jugador2 = jugador2.username;
    }
}