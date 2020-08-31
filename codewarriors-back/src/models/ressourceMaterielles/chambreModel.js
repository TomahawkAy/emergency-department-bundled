'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let Chambre = new Schema({

    num_chambre: {
        type: Number,
        required: 'num_chambre est obligatoire'
    },
    status_chambre: {
        type: String,
        default: 'libre',
    },
    date_creation: {
        type: Date,
        default: Date.now,
    },
    lits:[{
        type: Schema.Types.ObjectId,
        ref: 'Lit'
    }],
});

module.exports = mongoose.model('Chambre', Chambre);
