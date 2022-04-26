const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();

const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketio(server);

const {
  getSalas,
  agregarJugador,
} = require("./src/controllers/salaController");

//Importamos los routings
const loginRoutes = require("./src/routes/loginRoutes");
const registerRoutes = require("./src/routes/registerRoutes");
const roomsRoutes = require("./src/routes/roomsRoutes");

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
app.use(bodyParser.urlencoded({ extended: true }));
//Optional midddleware funtion to disable all the server request
/*app.use((req,res,next)=>{
    res.status(503).send("The server is currently down.  Please check soon! ")
})*/

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

/* socket.io */

io.on("connect", (socket) => {
  console.log("Nueva conexion");
  socket.on('newCuadrado', (msg) => {
    io.emit('tableroUpdate', msg);
  })
});

io.of("/rooms").on("connection", (socket) => {
  socket.on("playerUpdate", (msg) => {
    //console.log("Room Info updated");
    io.of("/rooms").emit("updateRoomInfo");
  });
  socket.on("startGame", (msg) => {
    console.log(msg);
  });
});
