const express = require('express');
const router = express.Router();
const {getSalas} = require('../src/controllers/salaController');

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

router.route('/api/v2/getRoomsInfo').get(getSalas);
module.exports=router;