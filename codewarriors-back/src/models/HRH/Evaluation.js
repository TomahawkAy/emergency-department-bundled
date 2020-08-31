const mongoose = require('mongoose');
const plugin = require('mongoosastic');
const evaluationSchema = new mongoose.Schema({
    personnel: {type: mongoose.Schema.Types.ObjectID, ref: 'staff'},
    fromDate: {type: Date},
    toDate: {type: Date},
    goals: {type: Array},
    average: {type: Number},
    appointments: {type: Array},
    appointmentsScore: {type: Number},
    totalScore: {type: Number}
});
evaluationSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});

const Evaluation = mongoose.model('evaluation', evaluationSchema);
module.exports = Evaluation;

