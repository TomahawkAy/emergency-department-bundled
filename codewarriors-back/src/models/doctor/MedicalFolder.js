const mongoose = require('mongoose');
const plugin = require('mongoosastic');
const folderSchema = new mongoose.Schema({
    createdAt: {type: Date},
    patientName: {type: String},
    patientLastName: {type: String},
    patientHealthState: {type: String},
    supervisor: {type: mongoose.Schema.Types.ObjectID, ref: 'staff'},
    attachments: []
});
