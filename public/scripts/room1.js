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

var jugador01 = "#ce0a29"; /* Rojo */
var jugador02 = "#a110fc"; /* Violeta */
var color_jugador = jugador01;

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
        context.strokeStyle = 'black';  //color de la línea
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

//función que se ejecuta automáticamente desde el html con la método onload al cargar el body
function crearTablero(){

    //Variables para crear el tablero
    let canvas = document.getElementById('tablero_canvas'); //metemos en una variable el canvas obtenido por id del documento html
    let context = canvas.getContext('2d');  //método canvas 2d
    let tamanyoCuad = canvas.width/6;

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

    let puntuacion_01 = 0;
    let puntuacion_02 = 0;

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        cuadrados.forEach(element => {
            if ((x > element.x && x < element.x + tamanyoCuad) && (y > element.y && y < element.y + tamanyoCuad)) {
                if (element.color == "transparent"){
                    //LO DEJO AQUÍ---------------------------------------------------------------------------------
                }
            }
        })
    } )

    console.log(cuadrados);
}






