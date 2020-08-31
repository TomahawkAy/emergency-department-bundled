'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let Medicament = new Schema({
    ref_med: {
        type: String,
        required: 'reférence medicament est obligatoire'
    },
    nom_med: {
        type: String,
        required: 'nom medicament est obligatoire'
    },
    quantite_med: {
        type: Number,
        required: 'quantite medicament est obligatoire'
    },
    date_entree: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Medicament', Medicament);

