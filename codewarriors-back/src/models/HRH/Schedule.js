const mongoose = require('mongoose');
const plugin = require('mongoosastic');
const scheduleSchema = new mongoose.Schema({
    name:{type:String},
    workDays: {type: Array},
    entryHour: {type: String},
    exitHour: {type: String},
    toleranceEntry: {type: String},
    toleranceExit: {type: String},
    penaltyPerMinute: {type: Number},
    penaltyPerDay: {type: Number},
    maxDayPenEntryLimit: {type: String},
    maxDayPenExitLimit: {type: String},
});
scheduleSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});
const Schedule = mongoose.model('schedule', scheduleSchema);
module.exports = Schedule;
