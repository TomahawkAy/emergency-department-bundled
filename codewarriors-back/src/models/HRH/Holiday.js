const mongoose = require('mongoose');
const plugin = require('mongoosastic');
const holidaySchema = new mongoose.Schema({
    holidayRequest: {type: mongoose.Schema.Types.ObjectID, ref: 'holidayRequest'},
    isActive: {type: Boolean},
});
holidaySchema.plugin(plugin,{
    host: "127.0.0.1",
    port: 9200,
});
const Holiday=mongoose.model('holiday',holidaySchema);
module.exports=Holiday;
