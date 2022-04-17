const usuario = require("../models/usuarioModel");



async function registerNewUser(req, res) {
    const reguser= await usuario.findByEmail(req.body.email);
    if(!reguser){
        try{
            console.log("antes del  create");
            let newuser= await usuario.create(req.body);
            console.log("register newuser: "+ newuser);
            return newuser;

        }catch (error){
            console.log(error);
        }
    }

}

module.exports = {
    registerNewUser
}