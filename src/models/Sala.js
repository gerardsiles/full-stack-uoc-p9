module.exports = class Sala {
  constructor(id, name, players, playerOne, playerTwo) {
    this.id = id;
    this.name = name;
    this.players = players;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }

  get name() {
    return this._nombre;
  }
  get players() {
    return this._players;
  }
  get playerOne() {
    return this._playerOne;
  }

  get playerTwo() {
    return this._playerTwo;
  }
  set name(nombre) {
    this._name = nombre;
  }
  set players(jugadores) {
    this._players = jugadores;
  }
  set playerOne(jugador1) {
    this._playerOne = jugador1;
  }

  set playerTwo(jugador2) {
    this._playerTwo = jugador2;
  }

  addPlayerRoom(player) {
    if (!this.playerOne) {
      this.playerOne(player);
      this.players += 1;
    } else if (!this.playerTwo) {
      this.playerTwo(player);
      this.players += 1;
    }
  }

  static jugadoresSala() {
    let jugadores = 0;
    if (this.playerOne) {
      jugadores++;
    }
    if (this.playerTwo) {
      jugadores++;
    }
    return jugadores;
  }
};
