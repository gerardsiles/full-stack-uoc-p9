// Importar los metodos de http y fs para cargar paginas
const http = require('http');
const path = require('path');
const fs = require('fs');

const { getUsuarios } = require('./src/controllers/usuarioController')

// Crear el servidor http y rutas
const server = http.createServer((req, res) => {
    // crear rutas
    if(req.url === '/') {
        //cargar homepage
        res.end('<h1>Home page</h1>');
    }
    else if (req.url === '/login'){
        res.end('<h1>Login</h1>');
    }
    else if(req.url === '/register') {
        //cargar registro
        fs.readFile(path.join(__dirname, 'public/views', '/register.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        });



        if (req.method === 'POST') {
            // registrar usuario
        }
    }
    // con get, mostramos las salas disponibles
    else if(req.url === '/api/usuarios' && req.method === 'GET') {
        getUsuarios(req, res)
    // con POST, comprobamos los registros de jugador y login
    }
    else if(req.url === '/roomgame') {
        res.end('<h1>Salas de Juego</h1>');

    } else {
        res.writeHead(404, {'Content-type': 'aplication/json'});
        res.end(JSON.stringify({message: 'Ruta no encontrada'}));
    }

    // // Build file path
    // let filePath = path.join(
    //     __dirname,
    //     "public/views/",
    //     req.url === "/" ? "index.html" : req.url
    // );
    //
    // // Extension of file
    // let extname = path.extname(filePath) ;
    //
    //
    // // Initial content type
    // let contentType = "text/html";
    //
    // // Check ext and set content type
    // switch (extname) {
    //     case ".js":
    //         contentType = "text/javascript";
    //         break;
    //     case ".css":
    //         contentType = "text/css";
    //         break;
    //     case ".json":
    //         contentType = "application/json";
    //         break;
    //     case ".png":
    //         contentType = "image/png";
    //         break;
    //     case ".jpg":
    //         contentType = "image/jpg";
    //         break;
    // }
    //
    // // Check if contentType is text/html but no .html file extension
    // if (contentType == "text/html" && extname == "") filePath += ".html";
    //
    // // log the filePath
    // console.log(filePath);
    //
    //
    //
    // // Read File
    // fs.readFile(filePath, (err, content) => {
    //     if (err) {
    //         if (err.code == "ENOENT") {
    //             // Page not found
    //             fs.readFile(
    //                 path.join(__dirname, "public", "404.html"),
    //                 (err, content) => {
    //                     res.writeHead(404, { "Content-Type": "text/html" });
    //                     res.end(content, "utf8");
    //                 }
    //             );
    //         } else {
    //             //  Some server error
    //             res.writeHead(500);
    //             res.end(`Server Error: ${err.code}`);
    //         }
    //     } else {
    //         // Success
    //         res.writeHead(200, { "Content-Type": contentType });
    //         res.end(content, "utf8");
    //     }
    // });

    // // comprobar si se envia el formulario de registro
    // http.get('/register', (res) => {
    //     const { statusCode } = res;
    //     const contentType = res.headers['content-type'];
    //
    //     let error;
    //     // Any 2xx status code signals a successful response but
    //     // here we're only checking for 200.
    //     if (statusCode !== 200) {
    //         error = new Error('Request Failed.\n' +
    //             `Status Code: ${statusCode}`);
    //     } else if (!/^application\/json/.test(contentType)) {
    //         error = new Error('Invalid content-type.\n' +
    //             `Expected application/json but received ${contentType}`);
    //     }
    //     if (error) {
    //         console.error(error.message);
    //         // Consume response data to free up memory
    //         res.resume();
    //         return;
    //     }
    //
    //     res.setEncoding('utf8');
    //     let rawData = '';
    //     res.on('data', (chunk) => { rawData += chunk; });
    //     res.on('end', () => {
    //         try {
    //             const parsedData = JSON.parse(rawData);
    //             console.log(parsedData);
    //         } catch (e) {
    //             console.error(e.message);
    //         }
    //     });
    // }).on('error', (e) => {
    //     console.error(`Got error: ${e.message}`);
    // });

    // try with https://stackoverflow.com/questions/33320673/how-to-send-http-request-to-submit-form-in-node-js-to-another-website


});

// definir el puerto en el environment, o el local
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Servidor ejecutandose en el puerto ${PORT}`));