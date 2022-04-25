if (getToken) {
  window.onload;
}
var socket = io("http://localhost:5000");
socket.on("connect", () => {
  console.log("conectado al back socket");
});

window.onload = function () {
  showRoomsInfo();
};
/* Actualizar informacion de las salas cada segundo */
const interval = setInterval(function () {
  showRoomsInfo();
}, 1000);

// clearInterval(interval);
function getToken() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  if (token) {
    return true;
  } else {
    document.location.href = "/login";
    return false;
  }
}
/* Guardar el avatar en el webstorage*/
let newBack = "url(../images/avatar-01.png)";
const avatar = sessionStorage.setItem("avatar", newBack);

/* Selección de salas */
/* ------------------------------------------------------------------------------------------------------------------------------- */

sala00.addEventListener("dragover", (e) => {
  //este es el comportamiento por defecto del navegador el cual no queremos que actue
  e.preventDefault(); // con preventDefault evitamos el comportamiento por defecto del navegador
  console.log("Drag Over");
});
sala00.addEventListener("drop", (e) => {
  console.log("Droping");
  sala00.appendChild(selectedAvatar);
});

sala01.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log("Drag Over");
  playBtn = document.getElementById("btn-sala01");
  if (playBtn.style.display === "block") {
    playBtn.style.display = "none";
  }
});
sala01.addEventListener("drop", (e) => {
  sala01.appendChild(selectedAvatar);
  playBtn = document.getElementById("btn-sala01");
  playBtn.style.display = "block";
  updatePlayer("1", "jugador1");
});

sala01.addEventListener("dragstart", (e) => {
  let players = document.getElementById("jugadores1").innerHTML;
  players--;
  document.getElementById("jugadores1").textContent = players;
  startGame();
});

sala02.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log("Drag Over");
  playBtn = document.getElementById("btn-sala02");
  if (playBtn.style.display === "block") {
    playBtn.style.display = "none";
  }
});
sala02.addEventListener("drop", (e) => {
  let players = document.getElementById("jugadores2").innerHTML;
  document.getElementById("jugadores2").textContent = players;
  sala02.appendChild(selectedAvatar);
  startGame();
});

sala02.addEventListener("dragstart", (e) => {
  let players = document.getElementById("jugadores2").innerHTML;
  players--;
  document.getElementById("jugadores2").textContent = players;
});

sala03.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log("Drag Over");
  playBtn = document.getElementById("btn-sala03");
  if (playBtn.style.display === "block") {
    playBtn.style.display = "none";
  }
});
sala03.addEventListener("drop", (e) => {
  let players = document.getElementById("jugadores3").innerHTML;
  players++;
  document.getElementById("jugadores3").textContent = players;
  sala03.appendChild(selectedAvatar);
  if (players === 2) {
    startGame();
  }
});

sala03.addEventListener("dragstart", (e) => {
  let players = document.getElementById("jugadores3").innerHTML;
  players--;
  document.getElementById("jugadores3").textContent = players;
});

sala04.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log("Drag Over");
  playBtn = document.getElementById("btn-sala04");
  if (playBtn.style.display === "block") {
    playBtn.style.display = "none";
  }
});
sala04.addEventListener("drop", (e) => {
  let players = document.getElementById("jugadores4").innerHTML;
  players++;
  if (players === 2) {
    startGame();
  }
  document.getElementById("jugadores4").textContent = players;
  sala04.appendChild(selectedAvatar);
  updatePlayer(4, "jugadorLogin");
});

sala04.addEventListener("dragstart", (e) => {
  let players = document.getElementById("jugadores4").innerHTML;
  players--;
  document.getElementById("jugadores4").textContent = players;
});
/* Elección de avatar */
/* ------------------------------------------------------------------------------------------------------------------------------- */

function chBackimage(newBack) {
  var elem = document.getElementById("selectedAvatar"); //creamnos una variable que nos almacena el elemento que queremos cambiar, nuestra imagen acutal del avatar.
  elem.style.backgroundImage = newBack; //modificamos el background del elemento almacenado en la linea anterior usando el valor que nos hemos traido con newBack en el click
  //avatar = newBack;                                           // guardamos en el webstorage el avatar seleccionado
}

function startGame(roomID, player1, player2) {
  /* Empezar una nueva partida en la sala y jugadores */
  console.log("empezando juego");
}

/* Conseguir la informacion de las salas */
const showRoomsInfo = async () => {
  const serverResponse = await fetch("/api/v2/getRoomsInfo");
  const data = await serverResponse.json();
  console.log(data);
  /* Insertar informacion en el DOM */
  /* ------------------------------------------------------------------------------------------------------------------------------- */

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
};

/* Actualizar jugadores al drop avatar */
async function updatePlayer(roomId, username) {
  var json = {
    id: roomId,
    username: username,
  };

  const response = await fetch("/api/v2/rooms", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  }).then(showRoomsInfo);
}

async function handleInit(data) {
  console.log(data);
}
