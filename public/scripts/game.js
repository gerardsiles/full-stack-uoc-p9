const api_url = "https://localhost:5000/api/room/1";
const username = localStorage.getItem("username");
const gameId = sessionStorage.getItem("gameId");
const _id = localStorage.getItem("_id");

window.addEventListener("load", (event) => {
  joinGame();
});

/* Set avatar seleccionado */
let newBack = localStorage.getItem("avatar");
document.getElementById("Jugador-01").style.backgroundImage = newBack;

/* Socket.io */
const socket = io("http://localhost:5000");

socket.on("init", handleInit);
socket.on("gameState", handleGameState);
socket.on("gameOver", handleGameOver);
socket.on("gameWin", handleGameWin);
socket.on("unknownGame", handleUnknownGame);
socket.on("tooManyPlayers", handleTooManyPlayers);

/* Global variables*/
let canvas = document.getElementById("tablero_canvas"); //metemos en una variable el canvas obtenido por id del documento html
let context = canvas.getContext("2d"); //método canvas 2d
canvas.width = canvas.height = 660;
let squareSize = canvas.width / 6;
let playerNumber;
let gameActive = false;
/* Indicar la sala favorita */
function chStar() {
  let elem = document.querySelector(".estrella");
  elem.innerHTML = '<i id="favorite" class="fas fa-star fa-2x"></i>';
}

function init() {
  // Dibujamos todos los cuadrados en sus posiciones
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      let xOffset = j * squareSize;
      let yOffset = i * squareSize;

      drawSquare(context, xOffset, yOffset, squareSize, "transparent");
    }
  }
  document.addEventListener("mousedown", mousedown);
  gameActive = true;
}

function mousedown(event) {
  const rect = canvas.getBoundingClientRect();
  let position = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    player: playerNumber,
  };
  socket.emit("mousedown", position);
}

function drawSquare(context, xOffset, yOffset, squareSize, color) {
  context.beginPath(); //Iniciamos Path (trazo)
  context.lineWidth = 1; //grosor de la linea
  context.rect(xOffset, yOffset, squareSize, squareSize); //Posición y medidas del cuadrado
  context.strokeStyle = "black"; //color de la línea
  context.fillStyle = color; //usamos este color para la línea
  context.fill(); //método rellenar cuadrado
  context.stroke(); //crear la línea
  context.closePath(); //Cerramos Path (trazo)
}
function paintGame(state) {
  /* Actualizar la informacion del jugador */
  document.getElementById("jugador_local").innerHTML = state.playerOne.username;
  document.getElementById("col_jugador_local").innerHTML =
    state.playerOne.color;
  document.getElementById("col_jugador_local").style.color =
    state.playerOne.color;
  document.getElementById("Jugador-01").style.borderColor =
    state.playerOne.color;
  document.getElementById("punt_jugador_local").innerHTML =
    ((state.playerOne.cellsConquered * 100) / 36).toFixed(2) + "%";

  document.getElementById("nombre-jugador-2").innerHTML =
    state.playerTwo.username;
  document.getElementById("col_jugador2").innerHTML = state.playerTwo.color;
  document.getElementById("Jugador-02").style.borderColor =
    state.playerTwo.color;
  document.getElementById("punt_jugador2").innerHTML =
    ((state.playerTwo.cellsConquered * 100) / 36).toFixed(2) + "%";

  /* Actualizar la informacion del juego */

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      let xOffset = j * squareSize;
      let yOffset = i * squareSize;
      let color = state.gameboard[i][j].color;
      drawSquare(context, xOffset, yOffset, squareSize, color);
    }
  }
}

function handleInit(number) {
  playerNumber = number;
}

function handleGameState(gameState) {
  if (!gameActive) {
    return;
  }
  gameState = JSON.parse(gameState);
  requestAnimationFrame(() => paintGame(gameState));
  document.getElementById("jugador_local").innerHTML =
    gameState.playerOne.username;
  document.getElementById("col_jugador_local").innerHTML =
    gameState.playerOne.color;
  document.getElementById("col_jugador_local").style.color =
    gameState.playerOne.color;
  document.getElementById("Jugador-01").style.borderColor =
    gameState.playerOne.color;
  document.getElementById("punt_jugador_local").innerHTML =
    gameState.playerOne.score;
}

function joinGame() {
  const gameCode = sessionStorage.getItem("gameID");
  socket.emit("joinGame", gameCode, username, _id);
  init();
}

function handleGameOver(data) {
  if (!gameActive) {
    return;
  }
  console.log(data.winner);
  data = JSON.parse(data);

  if (data.winner === playerNumber) {
    alert("ganas!");
  } else if (data.winner === 3) {
    alert("empate!");
  } else {
    alert("pierdes...");
  }
  gameActive = false;
  alert("ok");
  window.close();
}

function handleGameWin() {
  console.log("Has ganado!");
}

function handleUnknownGame() {
  reset();
  alert("La partida no existe");
}

function handleTooManyPlayers() {
  reset();
  alert("La partida ya ha empezado");
}

function reset() {
  playerNumber = null;
  //initialScreen.style.display = "block";
  //gameScreen.style.display = "none";
}
