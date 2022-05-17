const express = require("express");
const router = express.Router();
const Partida = require('../models/partidaSchema');


router.route("/api/partida/")
    .post(async (req, res, next) => {
            try{
                let {matchId, roomId, playerOne, playerTwo, winner} = req.body

                const partida = new Partida({matchId, roomId, playerOne, playerTwo, winner})

                await partida.save()
                if (partida.id){
                    res.status(200).send({"msg" : "Partida guardada con exito"})
                }

            }catch(err){
                console.error(err.message)
                res.status(500).send({"error" : "Server Error"})
            }
        }
    )
    .get(async (req, res) => {
        try {
            const partida = await Partida.find({})
            res.json(partida)
        } catch (err) {
            console.error(err.message)
            res.status(500).send({ "error": "Server Error" })
        }
    }
    )

    module.exports = router;