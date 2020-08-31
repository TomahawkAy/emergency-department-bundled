const mongoose = require('mongoose');
const plugin = require('mongoosastic');
const trainingRequestSchema = new mongoose.Schema({
    fromUser:{type:mongoose.Schema.Types.ObjectID,ref:'staff'},
    requestDate:{type:Date},
    response:{type:Boolean}
});
trainingRequestSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});
const TrainingRequest = mongoose.model('trainingRequest', trainingRequestSchema);
module.exports = TrainingRequest;
