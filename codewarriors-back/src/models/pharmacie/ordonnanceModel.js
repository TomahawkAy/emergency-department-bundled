'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let OrdonnanceSchema = new Schema({

    medicament:[{
    type: Schema.Types.ObjectId,
    ref: 'Medicament'
}],
    quantite_med_ordonnance: {
        type: Number,
        required: 'quantite medicament de l\'ordonnance est obligatoire'
    },
    date_ordonnance: {
        type: Date,
        default: Date.now,
    },
    user:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    chambre:[{
        type: Schema.Types.ObjectId,
        ref: 'Chambre'
    }]
});

module.exports = mongoose.model('Ordonnance', OrdonnanceSchema);
