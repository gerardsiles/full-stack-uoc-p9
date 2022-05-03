module.exports = class Sala {
  constructor(id, name, players, playerOne, playerTwo) {
    this.id = id;
    this.name = name;
    this.players = players;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }

  get name() {
    return this.nombre;
  }
  get players() {
    return this.jugadores;
  }
  get playerOne() {
    return this.jugador1;
  }

  get playerTwo() {
    return this.jugador2;
  }
  set name(nombre) {
    this._nombre = nombre;
  }
  set players(jugadores) {
    this._jugadores = jugadores;
  }
  set playerOne(jugador1) {
    this._jugador1 = jugador1;
  }

  set playerTwo(jugador2) {
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
};
