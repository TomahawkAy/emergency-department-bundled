const mongoose = require('mongoose');
const plugin = require('mongoosastic');
const appointmentSchema = new mongoose.Schema({
    entry: {type: String},
    exit: {type: String},
    date: {type: Date, default: new Date()},
    staff: {type: mongoose.Schema.Types.ObjectID, ref: 'staff'},
    penalizedByDay: {type: Boolean, default: false},
    penalizedByMinutes: {type: Boolean, default: false},
    penalizedInEntry: {type: Boolean, default: false},
    penalizedInExit: {type: Boolean, default: false},
    salaryPen: {type: Number, default: 0}
});
appointmentSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});
const Appointment = mongoose.model('appointment', appointmentSchema);
module.exports = Appointment;
//Y-m-d
