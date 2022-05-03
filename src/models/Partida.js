const Usuario = require("../models/usuarioModel");
const Sala = require("../models/partidaModel");

module.exports = class Partida {
  constructor(
    matchId,
    roomId,
    playerOne,
    playerTwo,
    gameboard,
    gridsize,
    cellsConquered
  ) {
    this.matchId = matchId;
    this.roomId = roomId;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.gameboard = gameboard;
    this.gridsize = gridsize;
    this.cellsConquered = cellsConquered;
  }
};
