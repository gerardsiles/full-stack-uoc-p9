## Desarrollo full stack

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

Hemos hecho el mockup de la aplicacion de manera grupal y colaborativa en Figma, adjuntamos el resultado en la entrega del producto. Los diagramas y las decisiones tambien estan detalladas en la entrega.
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