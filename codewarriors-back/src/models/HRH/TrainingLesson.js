const mongoose = require('mongoose');
const plugin = require('mongoosastic');
const lessonSchema = new mongoose.Schema({
    name: {type: String},
    videoFile: {type: String},
    section: {type: mongoose.Schema.Types.ObjectID, ref: 'trainingSection'},
    textContent: {type: String}
});
lessonSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});
const TrainingLesson = mongoose.model('trainingLesson', lessonSchema);
module.exports = TrainingLesson;
