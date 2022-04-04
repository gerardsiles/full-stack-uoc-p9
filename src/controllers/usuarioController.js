const Usuario = require('../models/usuarioModel')

// find devulve una promesa, al llamarlo lo hacemos con una funcion asincrona
async function getUsuarios(req, res) {
    try {
        // llamamos al modelo para deolvernos los usuarios
        const usuarios = await Usuario.findAll();

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(usuarios));
        res.end();
    } catch (error){
        console.log(error);
    }
}

// encontrar un usuario por su nombre de usuario
async function getUsuarioByUsername(req, res, username) {
    try {
            const usuario = await Usuario.findByUsername(username);

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(usuario));
    } catch (error){
        console.log(error);
    }
}

async function getUsuarioByEmail(req, res, email) {
    try {
            const user = await Usuario.findByEmail(email);

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
    } catch (error){
        console.log(error);
    }
}

async function createUsuario(req, res) {
    try {
        let body = '';
        // recibir los datos
        req.on('data', (chunk) => {
            // lo convertimos a una string
            body += chunk.toString();
        })
        // para terminar el request
        req.on('end', async () => {
        // objeto js con la informacion
            const { username, email, password } = JSON.parse(body);

            const usuario = {
                username,
                email,
                password,
            }

            const newUsuario = await Usuario.create(usuario);

            // escribir la informacion del head
            res.writeHead(201, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify(newUsuario));
        })
    } catch (error) {
        console.log(error);
    }
}
// Definir que funciones exporta el controlador
module.exports = {
    getUsuarios,
    getUsuarioByEmail,
    getUsuarioByUsername,
    createUsuario
}