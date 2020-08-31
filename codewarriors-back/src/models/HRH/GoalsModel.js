const mongoose = require('mongoose');
const plugin = require('mongoosastic');
const goalSchema = new mongoose.Schema({
    goalTitle: {type: String},
    goalDescription: {type: String},
    goalObjective: {type: Number},
    goalDate:{type:Date},
    goalProgress: {type: Number},
});
goalSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});
let Goal = mongoose.model('goal', goalSchema);
module.exports = Goal;
