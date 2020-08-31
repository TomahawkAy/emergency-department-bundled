const
    mongoose = require('mongoose'),
    rdvSchema = new mongoose.Schema({
        text:{type:String},
        start:{},
        end:{},
        doctor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        patient: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        analyses:{},
        statePatient:{type:String},

    });


const Rendezvous = mongoose.model('Rendezvous', rdvSchema);
module.exports = Rendezvous;
