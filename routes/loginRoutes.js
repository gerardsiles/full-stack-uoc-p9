
const express = require('express');
const router = express.Router();

const {getUsuarioByEmail} = require("../src/controllers/usuarioController");

//

express.static('public')

router.route("/login")
    .get((req,res)=>{
        res.sendFile(__dirname.replace('\\routes', '')+'/public/views/login.html')
    })
    .post( async (req, res) => {
        let useremail= req.body.email;
        const user = await getUsuarioByEmail(req, res, useremail);
        if(user){
            res.status(200).json({success:true, data:user});
        }else{
            console.log("Usuario no encontrado");
        }
    });

module.exports = router;