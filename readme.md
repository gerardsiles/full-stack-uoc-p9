## Desarrollo full stack

### Producto 2

En este producto se propone construir la parte del proyecto relacionada con el registro de los jugadores y la selección de las salas de juego, mediante un diseño responsive y sin persistencia de datos en el lado servidor.
<br>

### Pasos a seguir

- Realizar un mockup de la aplicación que se pretende desarrollar.
  <br>
  Se ha desarrollado el mockup grupalmente en Figma, y se han adjuntado en el documento de entrega.
  <br>

- Identificar las estructuras de datos, clases, etc., que representan el dominio.
 <br>
El diagrama UML esta adjuntado en la entrega
- Crear un repositorio de código en GitHub para el proyecto. Compartirlo con el consultor en el aula (se darán las indicaciones) y añadir el enlace al documento final.
   <br>
Este repositorio es el que hemos creado para participar grupalmente. Entre todos hemos desarrollado varias partes de la aplicacion y hemos hecho los commit una vez estaban testeados.
- Programar el lado cliente mediante JS, haciendo uso del framework Bootstrap para crear un diseño responsive.
<br>
Hemos implementado bootsrap en varias partes del codigo, en seleccionar avatar, o en los botone del registro por ejemplo, donde se utilizan varios elementos de bootstrap que se adaptan a la ituacion, incluyendo tambien los bootstrap icons.
- Crear la página de log in donde mínimo se pedirá email y contraseña. Además tiene que haber un link por si aún no te has registrado.
- Crear la página de register, donde por ejemplo aquí ya se puede escoger el avatar que vas a querer.
<br>
la implementacion del avatar la hemos hecho al escojer una sala.
- El juego presentará diversas salas donde los jugadores se agrupan por parejas. En el producto 3 se desarrollará el juego.
<br>
Se han implementado 4 salas, con el drag and drop incluido.
- Programar el lado servidor mediante NodeJS. En este primer producto no se debe utilizar el framework ExpressJS. Los datos referentes a los jugadores conectados y las salas con los diversos jugadores se almacenan en un array en memoria. No hay por tanto persistencia de datos en lado servidor. En este producto no se utiliza ninguna base de datos del lado servidor. En el producto 4 se realizará dicha persistencia utilizando una base de datos no SQL (MongoDB).
  <br>
hemos utilizado solamente modulos que node incluye de base, como fs, https y path para los enrutados y al comunicacion con el front.

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
```javascript
const avatar = sessionStorage.setItem(getElementById('selectedAvatar');
function chBackimage(newBack) {
    var elem = document.getElementById('selectedAvatar')        
    elem.style.backgroundImage = newBack;                       
    avatar = newBack;                                           
}
```

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
- Este criterio depende de una competencia del aprendizajeCreación del mockup de la aplicación, los requerimentos funcionales y un diagrama de clases UML
  - Todos los documentos están presentes, son correctos y detallados, y se justifican las decisiones en el diagrama de clases.
- Sistema de autenticación
  - El sistema de login está implementado, y se pueden jugar varias partidas a la vez.
- Este criterio depende de una competencia del aprendizajeUtilitzación de Bootstrap
- 3 puntos
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
