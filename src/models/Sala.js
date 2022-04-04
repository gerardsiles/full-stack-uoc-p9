module.exports = class Sala{
    constructor(id,nombre, jugador1, jugador2){
        this.id = id;
        this.nombre = nombre;
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
    }

    getJugador1() {
        return this.jugador1;
    }

    getJugador2() {
        return this.jugador2;
    }

    setJugador1(jugador1) {
        this.jugador1 = jugador1;
    }

    setJugador2(jugador2) {
        this.jugador2 = jugador2;
    }

    jugadoresSala() {
        let jugadores = 0;
        if(jugador1) {
            jugadores++;
        }
        if(jugador2) {
            jugadores++;
        }
    }

    getNombre() {
        return this.nombre;
    }
}
