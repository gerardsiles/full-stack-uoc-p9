const api_url = 'https://localhost:5000/api/room/1';


function chStar() {
    let elem = document.querySelector(".estrella");
    elem.innerHTML = '<i id="favorite" class="fas fa-star fa-2x"></i>';
    console.log(elem);

}


async function getRoomsInfo() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { id, nombre, jugadores, jugador1, jugador2 } = data;

    document.getElementById('nombre-jugador-1').textContent = jugador1;
    console.log(jugador1);
    console.log(nombre);
}


