const express = require('express');
const router = express.Router();


router.route("/rooms")
    .get((req,res)=>{
        res.sendFile(__dirname.replace('\\routes', '') + '/public/views/room.html')
    })
    .post((req,res)=>{

    });

router.route("/rooms/:roomnumber")
    .get((req,res)=>{
        let roomNumber = req.params.roomnumber;
        res.sendFile(__dirname.replace('\\routes', '') + '/public/views/room'+roomNumber+'.html')

    })
    .post((req,res)=>{

    });

module.exports=router;