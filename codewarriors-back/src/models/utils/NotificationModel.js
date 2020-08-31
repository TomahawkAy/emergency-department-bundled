const
    mongoose = require('mongoose'),
    notificationSchema = new mongoose.Schema({
        title: {type: String},
        description: {type: String},
        createdAt: {type: Date},
        receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    }),
    plugin = require('mongoosastic');
notificationSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});
const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
