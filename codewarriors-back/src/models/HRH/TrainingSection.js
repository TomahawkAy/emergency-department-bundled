const mongoose = require('mongoose');
const plugin = require('mongoosastic');
const trainingSectionSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    training: {type: mongoose.Schema.Types.ObjectID, ref: 'training'},
    lessons: [],
});
trainingSectionSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});
const trainingSection = mongoose.model('trainingSection', trainingSectionSchema);
module.exports = trainingSection;
