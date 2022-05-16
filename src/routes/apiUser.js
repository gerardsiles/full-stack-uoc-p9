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
    .post(

    );


module.exports = router;
