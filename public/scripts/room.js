const getRoomsInfoURL = "/api/v2/getRoomsInfo";
const addPlayerURL = "/api/v2/rooms/addPlayer";
const removePlayerURL = "/api/v2/rooms/removePlayer";
const playBtn1 = document.getElementById("btn-sala01");
const playBtn2 = document.getElementById("btn-sala02");
const playBtn3 = document.getElementById("btn-sala03");
const playBtn4 = document.getElementById("btn-sala04");

let roomFrom;
let roomTo;

// if (!document.cookie.username) {
//   window.location.replace("http://localhost:5000/login");
// }
/* Logout */
const botonLogout = document.getElementById("btn-logout");
botonLogout.addEventListener("click", (e) => {
  // hacer el logout
  console.info("logout");
  document.cookie = "username" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  location.reload();
});

/* Event listeners para los botones */
playBtn1.addEventListener("click", (e) => {
  window.open("http://localhost:5000/rooms/1");
});
playBtn2.addEventListener("click", (e) => {
  window.open("http://localhost:5000/rooms/2");
});
playBtn3.addEventListener("click", (e) => {
  window.open("http://localhost:5000/rooms/3");
});
playBtn4.addEventListener("click", (e) => {
  window.open("http://localhost:5000/rooms/4");
});

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
  if (sessionRoom === "sala00") {
    sala00.appendChild(selectedAvatar);
  } else if (sessionRoom === "sala01") {
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

sala00.addEventListener("dragover", (e) => {
  //este es el comportamiento por defecto del navegador el cual no queremos que actue
  e.preventDefault(); // con preventDefault evitamos el comportamiento por defecto del navegador
});
sala00.addEventListener("drop", (e) => {
  sala00.appendChild(selectedAvatar);
  sessionStorage.setItem("avatarRoom", "sala00");
});
sala00.addEventListener("dragstart", (e) => {
  roomFrom = "0";
});

sala01.addEventListener("dragover", (e) => {
  e.preventDefault();
  playBtn = document.getElementById("btn-sala01");
});
sala01.addEventListener("drop", (e) => {
  console.log(roomFrom);
  handleRemovePlayer(roomFrom, username); //quitar jugador de la sala origen el

  sala01.appendChild(selectedAvatar);
  playBtn = document.getElementById("btn-sala01");
  playBtn.style.display = "block";
  sessionStorage.setItem("avatarRoom", "sala01");
  handleAddPlayer("1", username);
});

sala01.addEventListener("dragstart", (e) => {
  roomFrom = "1";
});

sala02.addEventListener("dragover", (e) => {
  e.preventDefault();
  playBtn = document.getElementById("btn-sala02");
});
sala02.addEventListener("drop", (e) => {
  handleRemovePlayer(roomFrom, username); //quitar jugador de la sala origen el
  sala02.appendChild(selectedAvatar);
  sessionStorage.setItem("avatarRoom", "sala02");

  handleAddPlayer("2", username);
});

sala02.addEventListener("dragstart", (e) => {
  roomFrom = "2";

  //   handleRemovePlayer("2", username);
});

sala03.addEventListener("dragover", (e) => {
  e.preventDefault();
});
sala03.addEventListener("drop", (e) => {
  handleRemovePlayer(roomFrom, username); //quitar jugador de la sala origen el
  sala03.appendChild(selectedAvatar);
  sessionStorage.setItem("avatarRoom", "sala03");

  handleAddPlayer("3", username);
});

sala03.addEventListener("dragstart", (e) => {
  roomFrom = "3";

  //   handleRemovePlayer("3", username);
});

sala04.addEventListener("dragover", (e) => {
  e.preventDefault();
});
sala04.addEventListener("drop", (e) => {
  handleRemovePlayer(roomFrom, username); //quitar jugador de la sala origen el
  sala04.appendChild(selectedAvatar);
  sessionStorage.setItem("avatarRoom", "sala04");

  handleAddPlayer("4", username);
});

sala04.addEventListener("dragstart", (e) => {
  roomFrom = "4";

  //   handleRemovePlayer("4", username);
});

/* Elección de avatar */
/* ------------------------------------------------------------------------------------------------------------------------------- */
// add event listener to change the avatar
function chBackimage(newBack) {
  var elem = document.getElementById("selectedAvatar"); //creamnos una variable que nos almacena el elemento que queremos cambiar, nuestra imagen acutal del avatar.
  elem.style.backgroundImage = newBack; //modificamos el background del elemento almacenado en la linea anterior usando el valor que nos hemos traido con newBack en el click
  localStorage.setItem("avatar", newBack);
  var data = localStorage.getItem("avatar");
  localStorage.setItem("avatar", newBack); // guardamos en el webstorage el avatar seleccionado
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
  /* Abrir la partida si esta lista */
  if (data[0].players == 2) {
    /* mostrar el boton solo si el jugador se encuentra en esa sala */
    if (data[0].playerOne == username || data[0].playerTwo == username) {
      playBtn1.style.display = "block";
      sessionStorage.setItem("gameID1", data[0].gameID);
    }
  } else if (data[1].players == 2) {
    if (data[1].playerOne == username || data[1].playerTwo == username) {
      playBtn2.style.display = "block";
      sessionStorage.setItem("gameID2", data[1].gameID);
    }
  } else if (data[2].players == 2) {
    if (data[2].playerOne == username || data[2].playerTwo == username) {
      playBtn3.style.display = "block";
      sessionStorage.setItem("gameID3", data[2].gameID);
    }
  } else if (data[3].players == 2) {
    if (data[3].playerOne == username || data[3].playerTwo == username) {
      playBtn4.style.display = "block";
      sessionStorage.setItem("gameID4", data[3].gameID);
    }
  } else {
    playBtn1.style.display = "none";
    playBtn2.style.display = "none";
    playBtn3.style.display = "none";
    playBtn4.style.display = "none";
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
