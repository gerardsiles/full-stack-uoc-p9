const api_url = "https://localhost:5000/api/room/1";
const username = JSON.parse(localStorage.getItem("username"));
/* Socket.io */
const socket = io("http://localhost:5000");
socket.on("init", handleInit);
socket.on("gameState", handleGameState);
socket.on("gameOver", handleGameOver);
socket.on("gameWin", handleGameWin);

/* Global variables*/
let canvas = document.getElementById("tablero_canvas"); //metemos en una variable el canvas obtenido por id del documento html
let context = canvas.getContext("2d"); //método canvas 2d
canvas.width = canvas.height = 660;
let squareSize = canvas.width / 6;
let playerNumber;
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
}

function mousedown(event) {
  const rect = canvas.getBoundingClientRect();
  let position = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
  socket.emit("mousedown", position);
}
init();

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
  const jugador1 = document.getElementById("jugadorActual").innerHTML;
  document.getElementById("jugador_local").innerHTML = state.playerOne.username;
  document.getElementById("col_jugador_local").innerHTML =
    state.playerOne.color;
  document.getElementById("col_jugador_local").style.color =
    state.playerOne.color;
  document.getElementById("Jugador-01").style.borderColor =
    state.playerOne.color;
  document.getElementById("punt_jugador_local").innerHTML =
    ((state.playerOne.cellsConquered * 100) / 36).toFixed(2) + "%";

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

function handleInit(state) {
  playerNumber = number;
  const jugador1 = document.getElementById("jugadorActual").innerHTML;
  document.getElementById("jugador_local").innerHTML = state.playerOne.username;
  document.getElementById("col_jugador_local").innerHTML = playerOne.color;
  document.getElementById("col_jugador_local").style.color = playerOne.color;
  document.getElementById("Jugador-01").style.borderColor = playerOne.color;
  document.getElementById("punt_jugador_local").innerHTML = playerOne.score;
}

function handleGameState(gameState) {
  gameState = JSON.parse(gameState);
  requestAnimationFrame(() => paintGame(gameState));
}

function handleGameOver() {
  alert("Has perdido!");
}

function handleGameWin() {
  console.log("Has ganado!");
}
