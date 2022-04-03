//funcion para recibir informacion del front
async function getReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            // escuchar al front por el paquete de informacion
            req.on("data", (chunk) => {
                // lo convertimos a string
                body += chunk.toString();
            });
            // escuchar hasta terminar
            req.on("end", () => {
                // devolver la informacion
                resolve(body);
            });
            // control de errores
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { getReqData };