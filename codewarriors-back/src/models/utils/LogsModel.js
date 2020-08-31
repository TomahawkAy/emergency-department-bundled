const
    mongoose = require('mongoose'),
    logSchema = new mongoose.Schema({
        event: {type: String},
        description: {type: String},
        targetUser: {type: mongoose.Schema.Types.ObjectID, ref: 'User'}
    }),
    plugin = require('mongoosastic');
logSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});
const Logs = mongoose.model('logs', logSchema);
module.exports = Logs;
