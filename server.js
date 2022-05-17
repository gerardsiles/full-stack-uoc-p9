const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const connectDB = require("./src/db/connect");

require("dotenv").config();

const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketio(server);
// app.set("socket.io", io);
//Conexion a la BBDD
connectDB();

//Importamos los routings
const loginRoutes = require("./src/routes/loginRoutes");
const registerRoutes = require("./src/routes/registerRoutes");
const roomsRoutes = require("./src/routes/roomsRoutes");
const apiUserRoutes = require("./src/routes/apiUser");
const apiSalaRoutes = require("./src/routes/apiSalas");

/* Tratamiento de sesiones */
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.set("trust proxy", 1);
app.use(
  session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "shh!es,un-secreto",
    cookie: {
      maxAge: oneDay,
      sameSite: true,
      secure: "true",
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
//Optional midddleware funtion to disable all the server request
/*app.use((req,res,next)=>{
    res.status(503).send("The server is currently down.  Please check soon! ")
})*/
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
// redifinir la ruta de los archivos pug, declarar el motor de vistas
app.set("views", path.join(__dirname, "./public/views"));
app.set("view engine", "pug");
app.set("socketio", io);
//routing
app.use(loginRoutes);
app.use(registerRoutes);
app.use(roomsRoutes);
app.use(apiUserRoutes);
app.use(apiSalaRoutes);

server.listen(5000, () => {
  console.log("App listening.");
});
