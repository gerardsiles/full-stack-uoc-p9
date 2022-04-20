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


//clase para los jugadores
class Jugador {
    constructor(nombre, numJugador){
        this.nombre = nombre;
        this.numJugador = numJugador;
        this.color = colorRandom();  //color random
        this.puntuacion = 0;
    } 
}

function colorRandom() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



//clase para cada cuadrado
class Cuadrado {
    constructor(posx, posy, cuadSize, color){
        this.posx = posx;
        this.posy = posy;
        this.cuadSize = cuadSize;
        this.color = color;
    }

    draw(context){
        context.beginPath();            //Iniciamos Path (trazo)
        context.lineWidth = 1;          //grosor de la linea
        context.rect(this.posx, this.posy, this.cuadSize, this.cuadSize);  //Posición y medidas del cuadrado
        context.strokeStyle = "black";  //color de la línea
        context.fillStyle = this.color; //usamos este color para la línea
        context.fill();                 //método rellenar cuadrado
        context.stroke();               //crear la línea
        context.closePath();            //Cerramos Path (trazo)
    }
}



let cuadrados = []; //creo un array vacio para meter los cuadrados con el método push()
let punto = [];     

//Función para agregar objetos cuadrado a la lista de cuadrados
function lista(x, y, color){
    punto = {
        x: x,
        y: y,
        color: color
    };
    cuadrados.push(punto); //En el array cuadrados hacemos push de cada punto (propiedades) de cada cuadrado
}

function puntuacion(jugador){      //Función para actualizar la puntuación
    jugador.puntuacion ++;
}

//función que compruba que el cuadrado esté junto a otro cuadrado del mismo jugador
function junto(x, y, jugador){
    let valor = false;
    if (jugador.nombre == jugador_actual.nombre) {  //El jugador que está jugando la partida es igual al jugador actual (COMPROBACIÓN)
        cuadrados.forEach(element => {                      //Recorremos todos los elementos de nuestra lista cuadrados
            if (element.color == jugador.color){            
                if ((x-tamanyoCuad == element.x && y == element.y) || (x-tamanyoCuad == element.x && y+tamanyoCuad == element.y) || (x == element.x && y+tamanyoCuad == element.y) || (x+tamanyoCuad == element.x && y+tamanyoCuad == element.y) || (x+tamanyoCuad == element.x && y == element.y) || (x+tamanyoCuad == element.x && y-tamanyoCuad == element.y) || (x == element.x && y-tamanyoCuad == element.y) || (x-tamanyoCuad == element.x && y-tamanyoCuad == element.y)) { 
                    valor = true;
                }
            }                                                                                                   
        })
    } return valor;
}

let jugador_actual;
let tamanyoCuad; 

//función que se ejecuta automáticamente desde el html con la método onload al cargar el body
function crearTablero(){   

    //Entra nuevo jugador
    jugador_actual = new Jugador(document.getElementById("jugadorActual").innerHTML, 1);
    document.getElementById("jugador_local").innerHTML = jugador_actual.nombre;
    document.getElementById("col_jugador_local").innerHTML = jugador_actual.color;
    document.getElementById("col_jugador_local").style.color = jugador_actual.color;
    document.getElementById("Jugador-01").style.borderColor = jugador_actual.color;
    //document.getElementById("punt_jugador_local").innerHTML = jugador_actual.puntuacion;


    
    console.log(jugador_actual.nombre);
    
    //Variables para crear el tablero
    let canvas = document.getElementById('tablero_canvas'); //metemos en una variable el canvas obtenido por id del documento html
    let context = canvas.getContext('2d');  //método canvas 2d
    tamanyoCuad = canvas.width/6;

    // Dibujamos todos los cuadrados en sus posiciones 
    for (let i = 0; i < 6; i++) {  //creamos fila y abajo en j crea las casillas de la fila, después vuelve a i suma 1 y vuelve ha hacer todas las casillas j de la nueva fila
        let fila = i;
        for (let j= 0; j < 6; j++) {
            let xOffset = j * tamanyoCuad;  //la coordenada x del cuadrado que vamos a crear
            let yOffset = i * tamanyoCuad;  //la coordenada y del cuadrado que vamos a crear

            //creamos el objeto cuadrado usando class Cuadrado
            let cuadrado = new Cuadrado(xOffset, yOffset, tamanyoCuad, "transparent");

            //Añadimos el cuadrado creado y sus valores a la nuestra lista de cuadrados
            lista(xOffset, yOffset, "transparent");

            //dibujamos el objeto cuadrado que hemos creado
            cuadrado.draw(context);
        } 
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        cuadrados.forEach(element => {
            if ((x > element.x && x < element.x + tamanyoCuad) && (y > element.y && y < element.y + tamanyoCuad)) {  //comprobamos la ubicación del ratón               
                if (element.color == "transparent"){                                                                 
                    if (jugador_actual.puntuacion == 0) { //que el jugador no haya marcado ninguna casilla
                        let newCuadrado = new Cuadrado(element.x, element.y, tamanyoCuad, jugador_actual.color);
                        newCuadrado.draw(context);
                        puntuacion(jugador_actual);
                        element.color = jugador_actual.color;
                    } else if (jugador_actual.puntuacion > 0){ //el jugador ya ha marcaddo una casilla
                        if (junto(element.x, element.y, jugador_actual) == true) {
                            console.log("Funciona")
                            let newCuadrado = new Cuadrado(element.x, element.y, tamanyoCuad, jugador_actual.color);
                            newCuadrado.draw(context);
                            puntuacion(jugador_actual);
                            element.color = jugador_actual.color;
                            
                        }
                    }
                }
            }
        })
    })
    console.log(cuadrados);
}