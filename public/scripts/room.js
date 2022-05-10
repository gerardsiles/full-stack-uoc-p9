const getRoomsInfoURL = "/api/v2/getRoomsInfo";
const addPlayerURL = "/api/v2/rooms/addPlayer";
const removePlayerURL = "/api/v2/rooms/removePlayer";

/* Insertar el nombre de usuario en el DOM */
const usernameParagraph = document.getElementById("username");
const username = localStorage.getItem("username");
usernameParagraph.innerText = `Hola ${username}. Arrastra tu avatar a la sala`;
/* Guardar el avatar en el webstorage*/
let newBack = localStorage.getItem("avatar");
const avatar = localStorage.setItem("avatar", newBack);
document.getElementById("selectedAvatar").style.backgroundImage = newBack;

/* Al refrescar la pagina, volver el avatar a su posicion anterior */
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  let sessionRoom = sessionStorage.getItem("avatarRoom");
  console.log("Session room: " + sessionRoom);
  if (sessionRoom === "sala01") {
    sala01.appendChild(selectedAvatar);
  } else if (sessionRoom === "sala02") {
    sala02.appendChild(selectedAvatar);
  } else if (sessionRoom === "sala03") {
    sala03.appendChild(selectedAvatar);
  } else if (sessionRoom === "sala04") {
    sala04.appendChild(selectedAvatar);
  } else {
    sala00.appendChild(selectedAvatar);
  }
}

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
  sessionStorage.setItem("avatarRoom", "sala01");
  playBtn1.style.display = "block";
  handleAddPlayer("1", username);
});

sala01.addEventListener("dragstart", (e) => {
  handleRemovePlayer("1", username);
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
  sessionStorage.setItem("avatarRoom", "sala02");

  handleAddPlayer("2", username);
});

sala02.addEventListener("dragstart", (e) => {
  handleRemovePlayer("2", username);
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
  sessionStorage.setItem("avatarRoom", "sala03");

  handleAddPlayer("3", username);
});

sala03.addEventListener("dragstart", (e) => {
  handleRemovePlayer("3", username);
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
  sessionStorage.setItem("avatarRoom", "sala04");

  handleAddPlayer("4", username);
});

sala04.addEventListener("dragstart", (e) => {
  handleRemovePlayer("4", username);
});

/* Elección de avatar */
/* ------------------------------------------------------------------------------------------------------------------------------- */
// add event listener to change the avatar
function chBackimage(newBack) {
  var elem = document.getElementById("selectedAvatar"); //creamnos una variable que nos almacena el elemento que queremos cambiar, nuestra imagen acutal del avatar.
  elem.style.backgroundImage = newBack; //modificamos el background del elemento almacenado en la linea anterior usando el valor que nos hemos traido con newBack en el click
  localStorage.setItem("avatar", newBack);
  var data = localStorage.getItem("avatar");
  console.log(data);
  localStorage.setItem("avatar", newBack); // guardamos en el webstorage el avatar seleccionado
}

function startGame(roomID, player1, player2) {
  /* Empezar una nueva partida en la sala y jugadores */
  roomSocket.emit("startGame", { roomID, player1, player2 });
  console.log("empezando juego");
}

/* Al iniciar, cargar la informacion en el DOM */
async function initRoomsState() {
  fetch(getRoomsInfoURL)
    .then((response) => response.json())
    .then(async (data) => {
      await showRoomsData(data);
    });
  setTimeout(initRoomsState, 1000);
}
initRoomsState();

/* Insertar la informacion en el dom con los datos del servidor */
async function showRoomsData(data) {
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
    id: id,
    username: user,
  };
  const response = await fetch(addPlayerURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(async (data) => {
      await showRoomsData(data);
    });
}

async function handleRemovePlayer(id, user) {
  let data = {
    id: id,
    username: user,
  };

  const response = await fetch(removePlayerURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(async (data) => {
      await showRoomsData(data);
    });
}
