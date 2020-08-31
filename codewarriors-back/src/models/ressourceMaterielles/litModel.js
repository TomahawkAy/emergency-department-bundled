'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let Lit = new Schema({

    num_lit: {
        type: Number,
        required: 'num_lit est obligatoire'
    },
    status_lit: {
        type: String,
        default: 'libre'
    },
    date_creation: {
        type: Date,
        default: Date.now,
    },
    user:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
});

module.exports = mongoose.model('Lit', Lit);
