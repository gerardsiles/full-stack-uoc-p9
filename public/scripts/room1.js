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



/* ------------------------- TABLERO ------------------------- */

var canvas = document.getElementById('tablero_canvas');
var ctx = canvas.getContext('2d');
var c = canvas.width/6; /* Calcula el ancho del canvas y lo divide entre 7. Sólo usamos un valor porque alto y ancho son iguales */

var jugador_actual = jugador01;
var jugador01 = "#ce0a29"; /* Rojo */
var jugador02 = "#a110fc"; /* Violeta */
var color_jugador = jugador01;

/* Objeto con arrays de las posiciones y color responsive de cada cuadrado */
const cuadrado = {
    '1':{ x: c*0, y: c*0, color:""},
    '2':{ x: c*1, y: c*0, color:""},
    '3':{ x: c*2, y: c*0, color:""},
    '4':{ x: c*3, y: c*0, color:""},
    '5':{ x: c*4, y: c*0, color:""},
    '6':{ x: c*5, y: c*0, color:""},

    '7':{ x: c*0, y: c*1, color:""},
    '8':{ x: c*1, y: c*1, color:""},
    '9':{ x: c*2, y: c*1, color:""},
    '10':{ x: c*3, y: c*1, color:""},
    '11':{ x: c*4, y: c*1, color:""},
    '12':{ x: c*5, y: c*1, color:""},

    '13':{ x: c*0, y: c*2, color:""},
    '14':{ x: c*1, y: c*2, color:""},
    '15':{ x: c*2, y: c*2, color:""},
    '16':{ x: c*3, y: c*2, color:""},
    '17':{ x: c*4, y: c*2, color:""},
    '18':{ x: c*5, y: c*2, color:""},
    
    '19':{ x: c*0, y: c*3, color:""},
    '20':{ x: c*1, y: c*3, color:""},
    '21':{ x: c*2, y: c*3, color:""},
    '22':{ x: c*3, y: c*3, color:""},
    '23':{ x: c*4, y: c*3, color:""},
    '24':{ x: c*5, y: c*3, color:""},

    '25':{ x: c*0, y: c*4, color:""},
    '26':{ x: c*1, y: c*4, color:""},
    '27':{ x: c*2, y: c*4, color:""},
    '28':{ x: c*3, y: c*4, color:""},
    '29':{ x: c*4, y: c*4, color:""},
    '30':{ x: c*5, y: c*4, color:""},

    '31':{ x: c*0, y: c*5, color:""},
    '32':{ x: c*1, y: c*5, color:""},
    '33':{ x: c*2, y: c*5, color:""},
    '34':{ x: c*3, y: c*5, color:""},
    '35':{ x: c*4, y: c*5, color:""},
    '36':{ x: c*5, y: c*5, color:""}
}

function crearTablero(){

    /* Dibujamos todos los cuadrados en sus posiciones */
    var i;
    for (var i = 1; i <= 36; i++) {
        ctx.strokeRect(cuadrado[i].x, cuadrado[i].y, c, c);
        
    }

    /* creamos una función que recorreremos para cada cuadrado donde se creará un nuevo cudrado de color encima si clicamos sobre las coordenadas del cuadrado transparante */   
    canvas.addEventListener("click", function(e){
        for (var i = 1; i <= 36; i++) {
        
            if(e.clientX-canvas.offsetLeft > cuadrado[i].x && e.clientX-canvas.offsetLeft < cuadrado[i].x+c){
                if(e.clientY-canvas.offsetTop > cuadrado[i].y && e.clientY-canvas.offsetTop < cuadrado[i].y+c){
                    if (cuadrado[i].color == ""){   /* comprueba si no se ha asignado un color ya */
                        ctx.fillStyle = color_jugador;
                        ctx.fillRect(cuadrado[i].x, cuadrado[i].y, c, c);
                        cuadrado[i].color = color_jugador;
                        console.log(cuadrado);
                        ctx.fill();
                    } 
                }
            }
        }
    },false);
}






