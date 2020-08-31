const mongoose = require('mongoose');
const plugin = require('mongoosastic');
const trainingSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    ratingAverage: {type: Number},
    trainingSections: {type: Array},
    subscriptions: {type: Array},
    fromTrainingRequest: {type: Boolean},
    trainingRequest: {type: Array},
    trainingImage: {data: Buffer, contentType: String}
});
trainingSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});

let Training = mongoose.model('training', trainingSchema);
module.exports.Training = Training;
