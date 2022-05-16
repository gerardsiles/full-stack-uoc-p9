const express = require("express");
const router = express.Router();
const User = require('../models/usuarioSchema');




// @route    GET /user

router.route("/api/user/")
    .get(async (req, res, next) => {
        try {
            const user = await User.find({})
            res.json(user)
        } catch (err) {
            console.error(err.message)
            res.status(500).send({ "error": "Server Error" })
        }
    }
    )


    // @route    POST /user 

    .post(async (req, res, next) => {
        try {
            let { username, email, password } = req.body

            const user = new User({ username, email, password })

            await user.save()
            if (user.id) {
                res.status(200).send({ "msg": "Usuario creado con exito" })

            }

        } catch (err) {
            console.error(err.message)
            res.status(500).send({ "error": "Server Error" })
        }
    }
    );


// @route    GET /user/:userId

router.route("/api/user/:userId")
    .get(async (req, res) => {
        try {
            const id = req.params.userId
            const user = await User.findOne({ _id: id })
            if (user) {
                res.json(user)
            } else {
                res.status(404).send({ "error": "Usuario no encontrado" })
            }
        } catch (err) {
            console.error(err.message)
            res.status(500).send({ "error": "Server Error" })
        }
    }
    )


// @route    PUT /user/:userId

router.put("/api/user/:userId", async (req, res) => {
    try {
        const id = req.params.userId
        let body_request = req.body
        let update = { $set: body_request }

        let user = await User.findOneAndUpdate({ _id: id }, update, { new: true })
        if (user) {
            res.status(202).send({ "msg": "Usuario editado con éxito" })
        } else {
            res.status(404).send({ "error": "Usuario no encontrado" })
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": "Server Error" })
    }
});


// @route    DELETE /user/:userId

router.delete("/api/user/:userId", async(req, res) => {
    try {
      const id = req.params.userId
      const user = await User.findOneAndDelete({_id: id})
      if (user) {
        res.status(202).send({"msg": "Usuario eliminado con éxito"})
      } else {
        res.status(404).send({"error": "Usuario no encontrado"})
      }  
    } catch (err) {
      console.log(err.message)
      res.status(500).send({"error": "Server error"})
    }
  })
  



module.exports = router;
