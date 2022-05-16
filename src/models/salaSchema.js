const mongoose = require('mongoose')

const SalaSchema = new mongoose.Schema({


    name : {
        type : String,
        required : true
    },
    players: {
        type: Number,
        required: true

    },
    playerOne: {
        type: String,
        required: false,

    },
    playerTwo: {
        type: String,
        required: false,

    }

}, { autoCreate: true })

module.exports = mongoose.model('salas', SalaSchema)
