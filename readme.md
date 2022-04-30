## Desarrollo full stack
- Como utilizar la aplicacion?
La aplicacion funciona en el http://localhost:5000/ 
En la terminal, introduce npm run start, y en el navegador solamente hay que ir a esa direccion. Te llevara al login,
si no tienes una cuenta, puedes crear una, y al hacer el login te llevara a rooms, donde puedes escojer la sala donde 
jugar. Haz lo mismo en otro navegador para que hayan 2 jugadores en una sala, y el juego empezara en una ventana nueva.
### producto 3

- Identificar las estructuras de datos, clases, etc., que representan el dominio del juego multijugador.

No se han agregado clases o estructuras nuevas en este producto, seguimos utilizando la misma estructura identificada en
el anterior producto.

- Adaptar la solución obtenida en el producto 2 para incorporarla a un proyecto de ExpressJS.

- Para realizar la adaptacion a express, despues de instalarlo, hemos definido las rutas estaticas en el servidor para 
servir los .css y los .js
```javascript
app.use(express.json());
app.use(express.static("public"));
```

Luego, hemos creado las rutas en la carpeta de routes, cada modulo en routes se encarga de direccionar y 
llamar a los metodos necesarios para manejar las situaciones especificas de los enrutados.
```javascript
router
  .route("/register")
  .get((req, res) => {
    res.sendFile("/public/views/register.html", { root: "./" });
  })
  .post(createUsuario);
```

Despues se ha procedido a instalar express-sessions para manejar las sesiones en el servidor:
```javascript
/* Tratamiento de sesiones */
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "shh!es,un-secreto",
    cookie: {
      maxAge: oneDay,
      sameSite: true,
      secure: "production",
    },
  })
);
```

Tambien se han generado varios middleware propios para manejar situaciones de acceso con o sin session, encargarse de 
los errores o un asyncHandler que nos permite eliminar todas las lineas de codio try-catch a traves de este middleware.
Se encuentran en la carpeta de middleware.

- Programar una aplicación web MVC mediante ExpressJS<br>

Toda la aplicacion esta modularizada con el patron de diseno de MVC. El servidor solamente contiene lo necesario para 
funcionar, estando lo mas limpio posible. Las rutas se encuentran en router, que manejan las peticiones del front, y
llaman al controlador para manejar las diferentes situaciones de recibir datos del modelo y enviarlos a la vista. 
El controlador tambien se encarga de cargar las vistas con sus metodos. 
<br>
Los modulos en datos se encargan de trabajar con los datos de la aplicacion, en este caso todavia siguen conectandose
a los archivos JSON que contienen la informacion de los usuarios, partidas y salas, y los devuelve al controlador.
<br>
Todo esto se hace de manera asincrona des del controlador, utilizando en el modelo las promesas para devolver la informacion.
De esta manera, se respeta en todo momento el patron MVC y un servidor asincrono para que las peticiones no bloqueen los procesos.

- Desarrollar la lógica del juego de conquistar celdas

En este apartado vamos a discutir excluisvamente en la logica en el Controlador. El es el que se encarga de la mayoria 
comprobaciones del juego, y solamente se comunica con el modelo al crear la partida para recibir los datos.<br>
Pero antes, vamos a entender como se genera el juego y es mostrado en al usuario: <br>
Se genera un canvas de 660 x 660, y este se divide por cuadrados de 110x110. Este conjunto forma una matriz, y es lo que 
encontramos en el JSON de la partida en el gameboard, una matriz de 6x6 con las coordenadas x, y y su color.
Al iniciarse su color es transparente, y cuando el usuario hace click encima del canvas, se envian esas coordenadas 
al servidor para ser comprobadas. <br>

Ahora pasamos a la logica en el servidor:<br>
Cuando los datos llegan al controlador, lo primero que se hace es encontrar el nodo que pertenece a esas coordenadas:
```javascript
 for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      let currentNode = state.gameboard[i][j];

      /* Buscamos el nodo en la matriz con las cordenadas recibidas */
      if (
              keyCodeX > currentNode.x &&
              keyCodeX < currentNode.x + squareSize &&
              keyCodeY > currentNode.y &&
              keyCodeY < currentNode.y + squareSize
      ) {
      }
    }
}
```
Este loop de doble dimension encuentra el nodo que el usuario ha hecho click en el front. Una vez ha encontrado el nodo,
hace las diferentes comprobaciones para comprobar que si es el primer nodo que quiere conquistar, se encuentre disponible
(es decir, que el otro usuario no lo haya conquistado todavia), y si esta disponible, lo conquista, cambiando el color
de "transaprente" al color del usuario.
```javascript
  /* Si la celda no ha sido conquistada */
        if (currentNode.color === "transparent") {
          // si es el primer cuadrado
          if (state.playerOne.cellsConquered === 0) {
            /* Si la celda no ha sido conquistada todavia actualizamos valores*/
            currentNode.color = state.playerOne.color;
            state.playerOne.cellsConquered++;
            state.cellsConquered++;
          }
        }
```

Por ultimo, si ya hay una celda conquistada y siguiendo bajo la condicion de que el color de la celda sea 
"transparent", comprobamos con un segundo loop de dos niveles que se encarga de comprobar que el nodo que el usuario ha
seleccionado, sea colindante con un nodo previamente conquistado por ese usuario siempre que todavia queden celdas
por conquistar:

```javascript
else if (state.cellsConquered != 36) {
  /* comprobar si los nodos colindantes han sido conquistados por el jugador */
  if (legalMove(state, i, j)) {
    currentNode.color = state.playerOne.color;
    state.playerOne.cellsConquered++;
    state.cellsConquered++;
  }
}

/* Comprobar los nodos adyacentes por celdas conquistadas del jugador */
const legalMove = (state, i, j) => {
  for (let k = -1; k <= 1; k++) {
    for (let l = -1; l <= 1; l++) {
      /* Delimitamos los nodos fuera de la matriz */
      if (
              i + k < 0 ||
              i + k > state.gridsize - 1 ||
              j + l < 0 ||
              j + l > state.gridsize - 1
      ) {
        /* si el nodo esta fuera, salimos de la iteracion actual y continuamos */
        continue;
      }
      /* comprobar si hay un nodo conquistado por el jugador */
      if (state.gameboard[i + k][j + l].color == state.playerOne.color) {
        return true;
      }
    }
  }
};
```

Si pasa los condicionales, la celda es conquistada por el usuario, de lo contrario, no pasa nada.
- Implementar el framework Socket.io para conseguir transmitir las celdas de conquista entre los clientes y el servidor mediante websockets. Los datos de sala, usuario y posición se encuentran encapsulados en un JSON que se transmite entre cliente y servidor de  manera bidireccional.

Despues de instalar socket.io, hemos implementado los sockets en el front, agregando su script al pug y hemos manejado 
los emit y socket.on sus js. 

```javascript
/* Socket.io */
const socket = io("http://localhost:5000");
socket.on("init", handleInit);
socket.on("gameState", handleGameState);
socket.on("gameOver", handleGameOver);
socket.on("gameWin", handleGameWin);
```

En la parte del servidor, hemos implementado los sockets dentro de los enrutados, asi se generan las conexiones necesarias 
en cada sala de juego sin que se interfieran entre ellas.

```javascript
router
  .get("/rooms/:roomNumber", (req, res) => {
    var io = req.app.get("socketio");

    io.on("connection", (client) => {
      let state = createGameState();

      /* Al recibir del cliente el evento click con el raton */
      client.on("mousedown", handleMouseDown);

      function handleMouseDown(keyCode) {
        try {
          /* Parseamos los valores recibidos de las coordenadas */
          keyCodeX = parseInt(keyCode.x);
          keyCodeY = parseInt(keyCode.y);

          updateState(keyCodeX, keyCodeY, state);
        } catch (e) {
          console.log(e);
          return;
        }
      }
      startGameInterval(client, state);
    });
```

Ademas, tambien hemos aplicado un socket en rooms, que se utiliza para enviar y recibir informacion de la cantidad de
usuarios que se encuentran en las salas, de esta manera podemos ver los usuarios en cada sala a tiempo real des de los 
navegadores de los jugadores que esten conectados.

- Programar mediante la API HTML5 Canvas la rejillas, celdas y colores de las zonas conquistadas en cada sala por parte de cada jugador.

La area de juego se genera con un canvas, y se dibuja dentro de el las divisiones de las celdas:
```javascript
function init() {
  let canvas = document.getElementById("tablero_canvas"); //metemos en una variable el canvas obtenido por id del documento html
  let context = canvas.getContext("2d"); //método canvas 2d
  canvas.width = canvas.height = 660;
  let squareSize = canvas.width / 6;

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
```

Tambien se utiliza el canvas para detectar las coordenadas del click del usuario, para ser enviadas al servidor.
```javascript
function mousedown(event) {
  let canvas = document.getElementById("tablero_canvas");
  const rect = canvas.getBoundingClientRect();
  let position = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
  socket.emit("mousedown", position);
}
```

Se utiliza de nuevo el canvas para dibujar de manera sistematica el estado del juego recibida por el socket del servidor.

### RUBRICA
- motor de plantillas Pug

Para instalar pug, empezamos con el comando:
```node 
npm install pug-cli
```
esto nos permitria renderizar lo que escribamos en los archivos pug durante el desarrollo, de esta menra podemos
comprobar durante el desarrollo que las plantillas se renderizan correctamente.

para hacer que pug mire a nuestro archivo pug y genere el html, utilizamos este comando:
```node 
pug -w ./public/views -o ./public/views -P
```
luego, para que el servidor sepa que utilizamos pug, definimos la ruta donde los archivos estan localizados
y declaramos a pug como motor de vistas en el server.js:
```node 
app.set("views", path.join(__dirname, "./public/views"));
app.set("view engine", "pug");
```

- La aplicación hace un uso completamente funcional de canvas para indicar las celdas conquistadas, incorporando texto para por ejemplo indicar el porcentaje conquistado. Dispone de imágenes de fondo cargadas con canvas para dar un entorno visual más atractivo al juego.

El canvas es totalmente funcional en el juego. Ademas se inserta el nombre de usuario, su color seleccionado en el aura 
del jugador y en el div color, y se utiliza tambien para insertar su porcentaje conquistado. 
En el canvas se dibuja el tablero de juego con sus nodos, y tambien recoje las coordenadas para enviarlas al servidor. 
Se cargan imagenes de fondo en la sala de juego.

- La lógica del juego es correcta. Se indica visualmente quién está ganando. Se utiliza encaminamiento. Además se ha hecho servir el motor de plantillas Pug o Jade.

La logica de juego esta totalmente testeada y optimizada para evitar hacer comprobaciones innecesarias. Lo primero que 
se comprueba una vez encontrado el nodo en la matriz, es que este disponible para ser conquistada. Una vez hecha la 
comprobacion, se miran los diferentes requisitos para ser conquistadas y proceder o denegar la conquista. 

Todo esto se hace con un game loop dentro del socket, retransmitiendo a 30fps esa informacion. El game loop se rompe una 
vez se han conquistado todas las celdas y se presenta el resultado de la partida. En todo momento tambien se actualiza 
el porcentaje de celdas conquistadas de cada jugador.

Todas las vistas se renderizan a traves de pug des del controlador.
```javascript
// Router
router.route("/").get(renderLogin).post(login);
router.route("/login").get(renderLogin).post(login);
router.route("/logout");

// Controlador
// @desc cargar la vista de login
// @route GET /login
// @access public
async function renderLogin(req, res) {
  res.render("login");
}
```

- Se ha creado la clase Partida y Jugador y se han implementado métodos para la gestión del juego. Se hacen las verificaciones necesarias y asociadas a la lógica del juego.

Podemos encontrar las verificaciones de la partida en el controlador, donde se encarga de comprobar todos los requisitos 
para la logica del juego. 

La clase partida se encarga de generar una nueva partida, con dos jugadores dentro, y lso metodos de gestion del juego.

- Se ha utilizado WebSockets, con objetos JSON. Se hace uso de la biblioteca Socket.io

Se ha implementado socket.io como se ha descrito anteriormente, des de los enrutados, emitiendo y actualizando con loops 
la informacion de las salas de juego y de las partidas, informacin que se encuentra en los JSON, que son trabajados por 
el controlador una vez son recolectados des del modelo.

### Producto 2

En este producto se propone construir la parte del proyecto relacionada con el registro de los jugadores y la selección de las salas de juego, mediante un diseño responsive y sin persistencia de datos en el lado servidor.
<br>

### Pasos a seguir

- Realizar un mockup de la aplicación que se pretende desarrollar.

Se ha desarrollado el mockup grupalmente en Figma, y se han adjuntado en el documento de entrega.

[Enlace al mockup en Figma](https://www.figma.com/file/CkWNrENGZKPvCksX5GnXyh/langostas-games?node-id=0%3A1)

- Identificar las estructuras de datos, clases, etc., que representan el dominio.

El diagrama UML esta adjuntado en la entrega
- Crear un repositorio de código en GitHub para el proyecto. Compartirlo con el consultor en el aula (se darán las indicaciones) y añadir el enlace al documento final.

Este repositorio es el que hemos creado para participar grupalmente. Entre todos hemos desarrollado varias partes de la aplicacion y hemos hecho los commit una vez estaban testeados.
- Programar el lado cliente mediante JS, haciendo uso del framework Bootstrap para crear un diseño responsive.

Hemos implementado bootsrap en varias partes del codigo, en seleccionar avatar, o en los botones del registro por ejemplo, donde se utilizan varios elementos de bootstrap que se adaptan a la ituacion, incluyendo tambien los bootstrap icons.
```html
  <!-- del formulario de registro, implementamos bootstrap con form-control y los iconos de bootstrap-->
        <div class="form-control">
            <label>Email</label>
            <input type="email" placeholder="Correo electrónico" name="email" id="email" />
            <i class="bi-check-circle"></i>
            <i class="bi-exclamation-circle"></i>
            <small>Mensage de error</small>
        </div>
``` 

- Crear la página de log in donde mínimo se pedirá email y contraseña. Además tiene que haber un link por si aún no te has registrado.

La pagina esta implementada, y tenemos comprobaciones en el lado del servidor en el modelo que comprueban si el usuario existe

- Crear la página de register, donde por ejemplo aquí ya se puede escoger el avatar que vas a querer.

la pagina esta creada, con comprobaciones en el register.js para que los campos del registro no esten vacios e implementando bootstrap para marcar los errores.
ademas en el lado del servidor, se comprueba que el usuario no exista antes de registrarlo

ejemplo de como se comporta la aplicacion al recibir un json con la informacion del registro:

```json
// json de entrada
{
  "username": "funciona",
  "email": "prueba@uoc.edu",
  "password": "contrasena"
} 

// respuesta de la api: El usuario ya existe

// ejemplo de usuario que no existe
{
  "username": "nuevoUsuario",
  "email": "nuevo@uoc.edu",
  "password": "contrasena"
} 
// respuesta de la api
registrado nuevo usuario
{
  username: 'nuevoUsuario',
  email: 'nuevo@uoc.edu',
  password: 'contrasena'
}

```

la implementacion del avatar la hemos hecho al escojer una sala con bootstrap.

- El juego presentará diversas salas donde los jugadores se agrupan por parejas. En el producto 3 se desarrollará el juego.

se haimplementado en room, ademas se han creado 4 html para cada sala de juego, y sus enrutados en el servidor con un regex.
la informacion de las salas se recibe en el front en formato json

```json
// ejemplo del json recibido en la room/1 en la sala 1
{"id":"1","nombre":"Midgard","jugadores":0,"jugador1":"","jugador2":""}
```
Se han implementado 4 salas, con el drag and drop incluido.
```javascript
sala00.addEventListener('drop', e => {
console.log('Drop');
sala00.appendChild(selectedAvatar);
})
```

las 4 salas estan implementadas, con sus endpoints (room/1, room/2...).
Previamente, podemos escojer las salas en /room, donde tambien recibimos un json del servidor con su informacion.

Se puede arrastrar el avatar a cada sala para seleccionarla y agregar el jugador a la partida. Ademas, podemos cambiar el avatar en esta pagina.
- Programar el lado servidor mediante NodeJS. En este primer producto no se debe utilizar el framework ExpressJS. Los datos referentes a los jugadores conectados y las salas con los diversos jugadores se almacenan en un array en memoria. No hay por tanto persistencia de datos en lado servidor. En este producto no se utiliza ninguna base de datos del lado servidor. En el producto 4 se realizará dicha persistencia utilizando una base de datos no SQL (MongoDB).

hemos utilizado solamente modulos que node incluye de base, como fs, https y path para los enrutados y al comunicacion con el front.
Los otros modulos como utils son implementados por nosotros, a parte de cada modulo en su diseno de MVC.

para iniciar el primer paquete de node, insertamos ese comando en la temrinal:

```node
npm init
```

<br>
esto nos creara el primer paquete de node  .json necesarios. El back end ira en una carpeta llamada src.
<br>
ahora vamos a instalar nodemon, que nos permitira reiniciar nuestro servidor de manera automatica cuando guardemos los cambios, asi en el desarrollo no tenemos que ir reiniciando el servidor cuando hagamos cambios.
<br>

```node
npm i  nodemon
```

<br>
creamos el archivo server.js, y agregamos el primer script en nuestro package.json:

```javascript
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
},
```

Este script lo que hara es ejecutar el server y con nodemon hacer que se reinicie cada vez que guardemos los cambios. Ejecutamos el script:

```javascript
npm run-script start
npm run dev
```

- Almacenar en el frontend mediante la API de HTML5 webstorage las preferencias de sala de juego del jugador y el avatar seleccionado en el registro. Así cuando se entre de nuevo en la aplicación esta información ya se encuentra almacenada en el navegador.
Las preferencias de ala de juego se implementaran en el producto 3. Las preferencias de avatar se han implementado en la sala y se guardan en el navegador.

Para guardar las preferencias de la sala, o del avatar, y que solamente se guarden en la sesion, utilizamos sessionStorage:

```javascript
const avatar = sessionStorage.setItem(getElementById('selectedAvatar');
function chBackimage(newBack) {
    var elem = document.getElementById('selectedAvatar')        
    elem.style.backgroundImage = newBack;                       
    avatar = newBack;                                           
}
```

En este ejemplo, es como hemos implementado guardar la informacion del avatar seleccionado en el sessionStorage.

- Programar mediante la API HTML5 D&D un efecto de arrastrar el avatar del jugador a la sala seleccionada para jugar.
<br>
Esta implementado para escojer la sala, donde se arrastra el avatar a la partida.

```javascript
sala00.addEventListener('drop', e => {
console.log('Drop');
sala00.appendChild(selectedAvatar);
})
```


## RUBRICA
- Creacion del mockup de la aplicacion, los requerimientos funcionales y un diagrama de clases UML
  - Todos los documentos están presentes, son correctos y detallados, y se justifican las decisiones en el diagrama de clases.

Hemos hecho el mockup de la aplicacion de manera grupal y colaborativa en Figma. El enlace esta en este .md

Los diagramas estan en la entrega, y decidimos implementar este producto directamente con MVC, implementando las funcionalidades 
que detectamos de este producto, hacer el login, el formulario de registro, la sala principal de juego y las partidas, 
ademas de los enrutados en el servidor de node implementando los modulos necesarios para verificar la informacion recibida
y devolver la informacion al front con los datos de los usuarios y las salas.
- Sistema de autenticación
  - El sistema de login está implementado, y se pueden jugar varias partidas a la vez.

El sistema de autentificacion esta implementado en registerControler y usuarioModel, donde utilizamos funciones como:
```javascript
// funcion que devuelve todos los usuarios 
async function findAll() {
    // al trabajar con datos, devolvemos una promesa
    return new Promise((resolve, reject) => {
        resolve(usuarios);
    })
}

// encontrar a un usuario por su username
async function findByUsername(username) {
    return new Promise((resolve, reject) => {
        const usuario = usuarios.find((u) => u.username === username);
        resolve(usuario);
    })
}

// encontrar a un usuario por su email
async function findByEmail(email) {
    return new Promise((resolve, reject) => {
        const usuario = usuarios.find((u) => u.email === email)
        //console.log(sala);
        resolve(usuario);
    })
}
```

con estas funciones podemos autentificar si un usuario esta registrado o no.

Ademas, cada partida se genera como un objeto nuevo, y en una ventana nueva (la logica de jeugo, todavia no esta implementada hasta el producto 3)


- Utilizacion de bootstrap
  - La aplicación utiliza Bootstrap y alguna modificación personalizada de los estilos de Bootstrap. Incorpora animacions con la bibloteca JQuery.

Hemos incorporado bootstrap y bootstrap icons, como por ejemplo cuando una validacion del registro o login es incorrecto con los elementos de bootstram form-control y btn-success o btn-danger:
```javascript
function setSuccessFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    // agregar el mensage de exito

    small.innerText = message;

    formControl.className = "form-control btn-success";
}
```
Hemos utilizado animaciones de jquery, como por ejemplo para hacer que mensajes desaparezcan:
```javascript
<script>
    $(document).ready(function() {
        $('#par').fadeOut(3000);
    });
</script>
```
tambien hemos aplicado un modal de bootstrap para indicar el cambio de avatar en la sala.
- HTML5 Drag and drop
  - El Frontend utiliza la API de HTML5 de drag and drop arrastrando el avatar correctamente a la sala de juego, verificando en el lado cliente si la sala se encuentra llena.
  <br>
  
Podemos ver un ejemplo del integrado del drag and drop con el avatar, para soltarlo en las salas para seleccionarlas, estos eventos interactuan con el back end para agregar jugadores
```javascript
sala02.addEventListener('dragover', e => {  
    e.preventDefault();                   
    console.log('Drag Over');
})
sala02.addEventListener('drop', e => {
    console.log('Drop');
    sala02.appendChild(selectedAvatar);
})
```
<br>
  comprobamos los jugadores de la sala recibiendo la sala por su id, y comprobando si si valor es not null

```javascript
async function jugadoresSala(id) {
    let sala = findById(id);
    let s = JSON.parse(myJSON);
    let jugadores = 0;
    // si hay un jugador1 sumamos jugadores
    let jugador1 = s.jugador1;
    if (jugador1) {
        jugadores++;
    }
    let jugador2 = s.jugador2;
    if (jugador2) {
        jugadores++;
    }
    resolve(jugadores);
}
```

Ademas, cuando accedemos a la sala principal, o a las salas individuales, se recibe un paquete JSON con la informacion de esas salas
en el enrutado con metodo get recibimos el json con la informacion de las salas

```javascript
    } else if (url === '/room' && req.method === 'GET') {
        // cargamos la sala principal, y la informacion de las salas de juego
        stream = createReadStream((`${PUBLIC_FOLDER}/views/room.html`));
        // recibimos la informacion de las salas diponibles
       let informacionSalas = getSalas(req,res);
```
Esta es la informacion que recibimos en el front, que es la informacion de nuestro salas.json que se recibe en el servidor a trabes del Controlador de la Sala y su Modelo
```json
[
  {
    "id":"1",
    "nombre":"Midgard",
    "jugadores":0
  },
  {
    "id":"2",
    "nombre":"Valhalla",
    "jugadores":0
  },
  {
    "id":"3",
    "nombre":"Elfheim",
    "jugadores":0},
  {
    "id":"4",
    "nombre":"Asgard",
    "jugadores":0
  }
]
```

y si entramos en la sala1 a la sala4, recibimos la informacion especifica de la sala
```json
// informacion recibida en http://localhost:5000/room/1
{
  "id":"1",
  "nombre":"Midgard",
  "jugadores":0}
```
- Configuracion de NodeJs
    - Se ha instalado NodeJS de manera correcta, eficiente y segura.

hemos instalado node js tal y como esta explicado arriba, con nodemon como una dev dependency, ademas en el .gitignore no subimos las dev dependencies ni los node-modules

- Modularizacion del NodeJs
  - Se han creado más de dos módulos con NodeJS y se han documentado correctamente.

hemos aplicado ya en este producto el patron de diseno MVC, asi que tanto en controladores como en modelos tenemos varios moduclos, como los de clase. Recordemos que en Node,
cada archivo es un modulo, y se importan en los ficheros que sean necesarios:
```javascript
// importar el json en el modelo para la informacion de las salas
const salas = require('../data/salas.json')

// en partidaModel necesitamos interactuar con varios modulos, el objeto json, sala y jugador
const Partida = require('../data/partidas.json')
const Sala = require ('../models/salaModel');
const Jugador = require ('../models/usuarioModel');

```


de esta manera cada modulo solo importa lo necesario para trabajar con sus funciones.

- POO
  - Se ha creado la clase Partida y Jugador y se han implementado métodos para las diversas operaciones de registro, autenticación. Además los datos de los diferentes jugadores y las salas de juego se encuentran implementados en estructuras de datos dinámicas en la memoria del lado servidor.

tenemos implementadas las clases de Partida, Jugador y Sala. Creamos instancias para crear un nuevo usuario en login, o las diferentes salas
para poder juguar (4 en total), y cada nueva partida es tambien una nueva instancia. De esta manera podemos acceder a sus metodos, y sus propiedades siempre seran accedidas o 
modificadas a traves de estas instancias.

Todos los datos los encontramos en la carpeta de data, que incluye 3 arreglos de objetos JSON con la informacion de los usuarios, las salas o las partidas.