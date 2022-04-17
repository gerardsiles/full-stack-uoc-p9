const express = require('express');
const router = express.Router();
const {createUsuario} = require("../src/controllers/usuarioController");
const {registerNewUser} = require("../src/controllers/registerController");


router.route("/register")
    .get((req,res)=>{
        res.sendFile(__dirname.replace('\\routes', '') + '/public/views/register.html')
    })
    .post( async (req,res)=>{


        const newuser= await registerNewUser(req, res);
        console.log(typeof(newuser));
        if(newuser){
            res.status(200).json({success:true, data:newuser});

        }else{
            console.log("Usuario no se ha registrado");
        }


    });

module.exports = router;