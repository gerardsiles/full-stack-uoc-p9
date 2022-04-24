if (getToken) {
  window.onload;
}

/*window.onload = function(){
    console.log("cargando rooms");
    getToken();
}*/
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
  let players = document.getElementById("jugadores1").innerHTML;
  players++;
  document.getElementById("jugadores1").textContent = players;
  sala01.appendChild(selectedAvatar);
  playBtn = document.getElementById("btn-sala01");
  console.log(playBtn);
  playBtn.style.display = "block";
});

sala01.addEventListener("dragstart", (e) => {
  let players = document.getElementById("jugadores1").innerHTML;
  players--;
  document.getElementById("jugadores1").textContent = players;
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
  players++;
  document.getElementById("jugadores2").textContent = players;
  sala02.appendChild(selectedAvatar);
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
  document.getElementById("jugadores4").textContent = players;
  sala04.appendChild(selectedAvatar);
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
}
