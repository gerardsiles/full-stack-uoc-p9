module.exports = class Sala {
  constructor(id, nombre, jugadores, jugador1, jugador2) {
    this.id = id;
    this.nombre = nombre;
    this.jugadores = jugadores;
    this.jugador1 = jugador1;
    this.jugador2 = jugador2;
  }

  get nombre() {
    return this.nombre;
  }
  get jugadores() {
    return this.jugadores;
  }
  get jugador1() {
    return this.jugador1;
  }

  get jugador2() {
    return this.jugador2;
  }
  set nombre(nombre) {
    this._nombre = nombre;
  }
  set jugadores(jugadores) {
    this._jugadores = jugadores;
  }
  set jugador1(jugador1) {
    this._jugador1 = jugador1;
  }

  set jugador2(jugador2) {
    this._jugador2 = jugador2;
  }

  static jugadoresSala() {
    let jugadores = 0;
    if (this.jugador1) {
      console.log(this.jugador1);
      jugadores++;
    }
    if (this.jugador2) {
      jugadores++;
    }
  }

  static getNombre() {
    return this.nombre;
  }
};
