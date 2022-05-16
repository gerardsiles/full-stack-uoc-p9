const express = require("express");
const router = express.Router();
const User = require('../models/usuarioSchema');





router.route("/api/user/")
    .get(async(req, res, next)=> {
            try{
                const user = await User.find({})
                res.json(user)
            }catch(err){
                console.error(err.message)
                res.status(500).send({"error" : "Server Error"})
            }
        }
    )
    .post(async (req, res, next) => {
        try{
          let {username, email, password} = req.body
      
          const user = new User({username, email, password})
            
            await user.save()
            if (user.id){
              res.status(200).send({"msg" : "Usuario creado con exito"})

            }
          
        }catch(err){
          console.error(err.message)
          res.status(500).send({"error" : "Server Error"})
        }
      }
    );


    router.route("/api/user/:userId")
        .get( async(req, res, next)=> {
            try{
                const id = req.params.userId
                const user = await User.findOne({_id : id})
                if(user){
                    res.json(user)
                }else{
                    res.status(404).send({"error" : "Usuario no encontrado"})
                }
            }catch(err){
                console.error(err.message)
                res.status(500).send({"error" : "Server Error"})
            }
        }
    );




module.exports = router;
