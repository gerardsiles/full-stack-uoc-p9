const mongoose = require('mongoose')

const PartidaSchema = new mongoose.Schema({

    matchId: {
        type: String,
        required: true
    },

    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'salas',
        required: true
    },    

    /* players*/
    playerOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    
    winner: {
        type: Boolean
    },

    playerTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },

    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },

       

}, { autoCreate: true })

module.exports = mongoose.model('partidas', PartidaSchema)