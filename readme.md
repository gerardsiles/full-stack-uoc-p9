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

