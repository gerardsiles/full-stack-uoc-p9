const express = require("express");
const path = require("path");
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

//Importamos los routings
const loginRoutes = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");
const roomsRoutes = require("./routes/roomsRoutes");

app.use(express.json());
app.use(express.static("public"));
// redifinir la ruta de los archivos pug, declarar el motor de vistas
app.set("views", path.join(__dirname, "./public/views"));
app.set("view engine", "pug");

//routing
app.use(loginRoutes);
app.use(registerRoutes);
app.use(roomsRoutes);


server.listen(5000, () => {
  console.log("App listening.");
});

io.on('connection', (socket) => {
  console.log('Nueva conexion');
  socket.on('new login', (msg) => {
    console.log(msg);
  })
})



/*// Importar los metodos de http y fs para cargar paginas
const path = require("path");
const { createReadStream } = require("fs");
const http = require("http");

// importar utils
const { getReqData } = require("./src/utils/utils");

// importar las clases
const Usuario = require("./src/models/Usuario");
const sala = require("./src/models/Sala");
const partida = require("./src/models/Partida");

// importar controladores y modelos
const register = require("./src/controllers/registerController");
const {
  createUsuario,
  getUsuarios,
  getUsuarioByUsername,
  getUsuarioByEmail,
  checkIfExist,
} = require("./src/controllers/usuarioController");
const { getSalas, getSala } = require("./src/controllers/salaController");
const { findByEmail } = require("./src/models/usuarioModel");

// crear usuarios
let usuarioArray = new Array();
const usuario1 = new Usuario("jugador1", "jugador1@uoc.edu", "password1");
usuarioArray.push(usuario1);
const usuario2 = new Usuario("jugador2", "jugador2@uoc.edu", "password2");
usuarioArray.push(usuario2);

// Crear salas de juego

const sala1 = new sala("Asgard");
const sala2 = new sala("Elfheilm");
const sala3 = new sala("Midgard");
const sala4 = new sala("Asgard");

// Crear partidas
const partida1 = new partida(sala1, usuario1, usuario2);
const partida2 = new partida(sala2, usuario1, usuario2);
const partida3 = new partida(sala3, usuario1, usuario2);
const partida4 = new partida(sala4, usuario1, usuario2);

// definir el puerto en el environment, o el local
const PORT = process.env.PORT || 5000;

const HTML_CONTENT_TYPE = "text/html";
const CSS_CONTENT_TYPE = "text/css";
const JS_CONTENT_TYPE = "text/javascript";
const JSON_CONTENT_TYPE = "application/json";

// creamos la ruta de las vistas
const PUBLIC_FOLDER = path.join(__dirname, "public");

// creamos un servidor con el requestListener
const server = http.createServer(async (req, res) => {

    const { url } = req;
  let statusCode = 200;
  let contentType = HTML_CONTENT_TYPE;
  let stream;

  // crear los endpoints
  if (url === "/") {
    stream = createReadStream(`${PUBLIC_FOLDER}/views/login.html`);
  } else if (url === "/register" && req.method === "GET") {
    stream = createReadStream(`${PUBLIC_FOLDER}/views/register.html`);
  } else if (url === "/register" && req.method === "POST") {
    createUsuario(req, res);
    // despues de crear el usuario, cargamos login
    stream = createReadStream(`${PUBLIC_FOLDER}/views/login.html`);
  } else if (url === "/login") {
    if (req.method === "GET") {
      stream = createReadStream(`${PUBLIC_FOLDER}/views/login.html`);
    }
    if (req.method === "POST") {
      req.on("data", async (chunk) => {
        let usuarioEnviado = JSON.parse(chunk);
        var exists = await findByEmail(usuarioEnviado.email);

        if (exists) {
          console.log(
            "El usuario " +
              usuarioEnviado.email +
              " existe y sus credenciales son correctas. "
          );
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(exists));
        } else {
          console.log("El usuario " + usuarioEnviado.email + " NO EXISTE!!! ");
          console.log(`El usuario ${usuarioEnviado.email} no existe. `);
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("User no found");
        }
      });
    }

    // Ruta para las salas
  } else if (url === "/room" && req.method === "GET") {
    // cargamos la sala principal, y la informacion de las salas de juego
    stream = createReadStream(`${PUBLIC_FOLDER}/views/room.html`);
    // recibimos la informacion de las salas diponibles
//     let informacionSalas = getSalas(req, res);

    // regex para comprobar que sala accedemos, de la 1 a la 4
  } else if (req.url.match(/\/room\/([1-4]+)/) && req.method === "GET") {
    const id = req.url.split("/")[2];
    // recibir informacion de la sala
    //          getSala(req, res, id);
    stream = createReadStream(`${PUBLIC_FOLDER}/views/room${id}.html`);
  } else if (url.match(".css$")) {
    // para los archivos CSS
    contentType = CSS_CONTENT_TYPE;
    stream = createReadStream(`${PUBLIC_FOLDER}${url}`);
  } else if (url.match(".js$")) {
    // para los archivos JavaScript
    contentType = JS_CONTENT_TYPE;
    stream = createReadStream(`${PUBLIC_FOLDER}${url}`);
  } else if (url.match(".png$")) {
    // para los archivos png
    contentType = "image/png";
    stream = createReadStream(`${PUBLIC_FOLDER}${url}`);
  } else {
    // si llegamos aquí, es un 404
    statusCode = 404;
  }

  // escribimos las cabeceras de la respuesta dependiendo de la request
  res.writeHead(statusCode, { "Content-Type": contentType });
  // si tenemos un stream, lo enviamos a la respuesta
  if (stream) stream.pipe(res);
  //     // si no, devolvemos un string diciendo que no hemos encontrado nada
  //    else return res.end('Not found')
  //     // Leer el formulario de registro
});






// hacemos que el servidor escuche el puerto configurado
server.listen(PORT, () =>
  console.log(`Servidor ejecutandose en el puerto ${PORT}`)
);*/
