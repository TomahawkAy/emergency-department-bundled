'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let Sejour = new Schema({

    date_debut: {
        type: Date,
        required: 'date_debut est obligatoire'
    },
    date_fin: {
        type: Date,
        required: 'date_fin est obligatoire'
    },
    lit:[{
        type: Schema.Types.ObjectId,
        ref: 'Lit'
    }],

    patient:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    nurse:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    date_creation: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('Sejour', Sejour);
