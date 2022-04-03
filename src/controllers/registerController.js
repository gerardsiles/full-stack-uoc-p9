const usuario = require("../models/usuarioModel");



async function registerNewUser(req, res) {
    usuario.userExists();
    if(!userExists()){
        try{
            await usuario.createUser();
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("usuario creado");
            res.end();

        }catch (error){
            console.log(error);
        }
    }

}

module.exports = {
    registerNewUser
}