const mongoose = require('mongoose');
const plugin = require('mongoosastic');
const holidayRequestSchema = new mongoose.Schema({
    from_date: {type: Date},
    to_date: {type: Date},
    motive: {type: String},
    description: {type: String},
    payed: {type: Boolean},
    staff: {type: mongoose.Schema.Types.ObjectID, ref: 'staff'},
    holiday: {type: mongoose.Schema.Types.ObjectID, ref: 'holiday'},
});
holidayRequestSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});
const HolidayRequest = mongoose.model('holidayRequest', holidayRequestSchema);
module.exports = HolidayRequest;
