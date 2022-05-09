var socket = io("http://localhost:5000");
var roomSocket = io("/rooms");

socket.on("roomState", handleRoomsState);
socket.on("addPlayer", handleAddPlayer);
socket.on("removePlayer", handleRemovePlayer);

const usernameParagraph = document.getElementById("username");
const username = sessionStorage.getItem("username");
usernameParagraph.innerText = `Hola ${username}. Arrastra tu avatar a la sala`;
/* Guardar el avatar en el webstorage*/
let newBack = localStorage.getItem("avatar");
const avatar = localStorage.setItem("avatar", newBack);

/* Selección de salas */
/* ------------------------------------------------------------------------------------------------------------------------------- */
/* Globales */
playBtn1 = document.getElementById("btn-sala01"); // boton para unirse a la sala

sala00.addEventListener("dragover", (e) => {
  //este es el comportamiento por defecto del navegador el cual no queremos que actue
  e.preventDefault(); // con preventDefault evitamos el comportamiento por defecto del navegador
});
sala00.addEventListener("drop", (e) => {
  sala00.appendChild(selectedAvatar);
});

sala01.addEventListener("dragover", (e) => {
  e.preventDefault();
  playBtn = document.getElementById("btn-sala01");
  if (playBtn.style.display === "block") {
    playBtn.style.display = "none";
  }
});
sala01.addEventListener("drop", (e) => {
  sala01.appendChild(selectedAvatar);
  playBtn1.style.display = "block";
  handleAddPlayer("1", "prueba");
});

sala01.addEventListener("dragstart", (e) => {
  handleRemovePlayer("1", "jugadorX");
});

sala02.addEventListener("dragover", (e) => {
  e.preventDefault();
  playBtn = document.getElementById("btn-sala02");
  if (playBtn.style.display === "block") {
    playBtn.style.display = "none";
  }
});
sala02.addEventListener("drop", (e) => {
  sala02.appendChild(selectedAvatar);
  handleAddPlayer("2", "prueba");
});

sala02.addEventListener("dragstart", (e) => {
  handleRemovePlayer("2", "jugadorX");
});

sala03.addEventListener("dragover", (e) => {
  e.preventDefault();
  playBtn = document.getElementById("btn-sala03");
  if (playBtn.style.display === "block") {
    playBtn.style.display = "none";
  }
});
sala03.addEventListener("drop", (e) => {
  sala03.appendChild(selectedAvatar);
  handleAddPlayer("3", "prueba");
});

sala03.addEventListener("dragstart", (e) => {
  handleRemovePlayer("3", "jugadorX");
});

sala04.addEventListener("dragover", (e) => {
  e.preventDefault();
  playBtn = document.getElementById("btn-sala04");
  if (playBtn.style.display === "block") {
    playBtn.style.display = "none";
  }
});
sala04.addEventListener("drop", (e) => {
  sala04.appendChild(selectedAvatar);
  handleAddPlayer("4", "prueba");
});

sala04.addEventListener("dragstart", (e) => {
  handleRemovePlayer("4", "jugadorX");
});

playBtn1.addEventListener("click", joinGame);

async function joinGame() {
  socket.emit("joinGame");
}
/* Elección de avatar */
/* ------------------------------------------------------------------------------------------------------------------------------- */
// add event listener to change the avatar
function chBackimage(newBack) {
  var elem = document.getElementById("selectedAvatar"); //creamnos una variable que nos almacena el elemento que queremos cambiar, nuestra imagen acutal del avatar.
  elem.style.backgroundImage = newBack; //modificamos el background del elemento almacenado en la linea anterior usando el valor que nos hemos traido con newBack en el click
  console.log(newBack);
  var data = localStorage.getItem("avatar");
  console.log(data);
  localStorage.setItem("avatar", newBack); // guardamos en el webstorage el avatar seleccionado
}

function startGame(roomID, player1, player2) {
  /* Empezar una nueva partida en la sala y jugadores */
  roomSocket.emit("startGame", { roomID, player1, player2 });
  console.log("empezando juego");
}

/* Socket.io */
/* Al iniciar, cargar la informacion en el DOM */
async function handleRoomsState(state) {
  roomsState = state;
  await showRoomsInfo(state);
}

async function showRoomsInfo(data) {
  document.getElementById("nombre1").textContent = data[0].name;
  document.getElementById(
    "jugadores1"
  ).textContent = `Numero de jugadores ${data[0].players}`;
  document.getElementById("nombre2").textContent = data[1].name;
  document.getElementById(
    "jugadores2"
  ).textContent = `Numero de jugadores ${data[1].players}`;
  document.getElementById("nombre3").textContent = data[2].name;
  document.getElementById(
    "jugadores3"
  ).textContent = `Numero de jugadores ${data[2].players}`;
  document.getElementById("nombre4").textContent = data[3].name;
  document.getElementById(
    "jugadores4"
  ).textContent = `Numero de jugadores ${data[3].players}`;

  if (data[3].players == 2) {
    window.open("http://localhost:5000/rooms/1");
    startGame(3, "player1", "player2");
    removePlayer("3", data[3].player1);
    removePlayer("3", data[3].player2);
  }
}

async function handleAddPlayer(id, user) {
  let data = {
    roomId: id,
    username: user,
  };
  socket.emit("addPlayer", data);
  console.log("emit add player");
}

async function handleRemovePlayer(id, user) {
  let data = {
    roomId: id,
    username: user,
  };
  socket.emit("removePlayer", data);
  console.log("emit removePlayer player");
}
