// Importar los metodos de http y fs para cargar paginas
const path = require('path');
const {createReadStream} = require('fs');
const {createServer} = require('http');

// importar las clases
const usuario = require('./src/models/Usuario');
const sala = require('./src/models/Sala');
const partida = require('./src/models/Partida');

// importar controladores y modelos
const register = require('./src/controllers/registerController');
const user = require("./src/models/usuarioModel");
const {createUsuario, getUsuarios, checkIfExist} = require("./src/controllers/usuarioController");


// array para guardar usuarios
let usuarioArray = new Array();
const usuario1 = new usuario("jugador1", "jugador1@uoc.edu", "password1");
usuarioArray.push(usuario1);
const usuario2 = new usuario("jugador2", "jugador2@uoc.edu", "password2");
usuarioArray.push(usuario2);

// Crear salas de juego
const sala1 = new sala("Valhalla");
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

const HTML_CONTENT_TYPE = 'text/html';
const CSS_CONTENT_TYPE = 'text/css';
const JS_CONTENT_TYPE = 'text/javascript';

// creamos la ruta de las vistas
const PUBLIC_FOLDER = path.join(__dirname, 'public');

// creamos un requestListener para pasarle a nuestro servidor
const requestListener = (req, res) => {
    const {url} = req
    let statusCode = 200
    let contentType = HTML_CONTENT_TYPE
    let stream
    if (url === '/api/usuarios' && req.method === 'POST') {
        getUsuarios(req,res);
    }

    if (url === '/') {
        stream = createReadStream(`${PUBLIC_FOLDER}/views/index.html`)
    } else if (url === '/register') {
        if (req.method === 'GET') {
            stream = createReadStream(`${PUBLIC_FOLDER}/views/register.html`);
        }
        if (req.method === 'POST') {
            //TODO
            req.on('data', async chunk => {
                //agregar el usuario a la array
                let usuarioEnviado = JSON.parse(chunk);
                console.log(usuarioEnviado.email);
                console.log(usuarioEnviado.password);
                console.log(usuarioEnviado.username);
                await createUsuario(usuarioEnviado.username,usuarioEnviado.email, usuarioEnviado.password);//usuarioArray.push(chunk);
            })
        }
    } else if(url === '/login'){
        if (req.method === 'GET') {
            stream = createReadStream(`${PUBLIC_FOLDER}/views/login.html`);
        }
        if (req.method === 'POST') {
            //TODO
            req.on('data', async chunk => {
                let usuarioEnviado = JSON.parse(chunk);
                var exists = await checkIfExist(usuarioEnviado.email, usuarioEnviado.password);


                //console.log("test: " + test.valueOf());
                //console.log("typeof: "+ typeof(test));

                if (exists) {
                    console.log("El usuario " + usuarioEnviado.email + " existe y sus credenciales son correctas. ");
                } else {
                    console.log("El usuario " + usuarioEnviado.email + " NO EXISTE!!! ");
                }


            })
        }

    } else if (url === '/room') {
        stream = createReadStream((`${PUBLIC_FOLDER}/views/room.html`));
    }
    else if (url.match("\.css$")) { // para los archivos CSS
        contentType = CSS_CONTENT_TYPE
        stream = createReadStream(`${PUBLIC_FOLDER}${url}`)
    } else if (url.match("\.js$")) { // para los archivos JavaScript
        contentType = JS_CONTENT_TYPE
        stream = createReadStream(`${PUBLIC_FOLDER}${url}`)
    } else { // si llegamos aquí, es un 404
        statusCode = 404
    }


    // escribimos las cabeceras de la respuesta dependiendo de la request
    res.writeHead(statusCode, {'Content-Type': contentType})
    // si tenemos un stream, lo enviamos a la respuesta
    if (stream) stream.pipe(res)
    // si no, devolvemos un string diciendo que no hemos encontrado nada
    else return res.end('Not found')
    // Leer el formulario de registro


}

// creamos un servidor con el requestListener
const server = createServer(requestListener)

// hacemos que el servidor escuche el puerto configurado
server.listen(PORT, () => console.log(`Servidor ejecutandose en el puerto ${PORT}`));