const express = require("express");
const router = express.Router();
const Sala = require('../models/salaSchema');





// @route    GET /sala

router.route("/api/sala/")
    .get(async(req, res, next)=> {
            try{
                const sala = await Sala.find({})
                res.json(sala)
            }catch(err){
                console.error(err.message)
                res.status(500).send({"error" : "Server Error"})
            }
        }
    )
    .post(async (req, res, next) => {
            try{
                let {name, players, playerOne, PlayerTwo} = req.body

                const sala = new Sala({name, players, playerOne, PlayerTwo})

                await sala.save()
                if (sala.id){
                    res.status(200).send({"msg" : "Sala creada con exito"})

                }

            }catch(err){
                console.error(err.message)
                res.status(500).send({"error" : "Server Error"})
            }
        }
    );

// @route    GET /sala/:salaId

router.route("/api/sala/:salaId")
    .get( async(req, res, next)=> {
            try{
                const id = req.params.salaId
                const sala = await Sala.findOne({_id : id})
                if(sala){
                    res.json(sala)
                }else{
                    res.status(404).send({"error" : "Sala no encontrada"})
                }
            }catch(err){
                console.error(err.message)
                res.status(500).send({"error" : "Server Error"})
            }
        }
    );


// @route    PUT /sala/:salaId

router.put("/api/sala/:salaId", async (req, res) => {
    try {
        const id = req.params.salaId
        let body_request = req.body
        let update = { $set: body_request }

        let sala = await Sala.findOneAndUpdate({ _id: id }, update, { new: true })
        if (sala) {
            res.status(202).send({ "msg": "Sala editada con éxito" })
        } else {
            res.status(404).send({ "error": "Sala no encontrada" })
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": "Server Error" })
    }
});


// @route    DELETE /sala/:salaId

router.delete("/api/sala/:salaId", async(req, res) => {
    try {
        const id = req.params.salaId
        const sala = await Sala.findOneAndDelete({_id: id})
        if (sala) {
            res.status(202).send({"msg": "Sala eliminada con éxito"})
        } else {
            res.status(404).send({"error": "Sala no encontrada"})
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).send({"error": "Server error"})
    }
})



module.exports = router;
