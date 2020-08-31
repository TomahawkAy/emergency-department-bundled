const
    mongoose = require('mongoose'),
    plugin = require('mongoosastic'),
    staffSchema = new mongoose.Schema({
        staffType: {type: String},
        salary: {type: Number},
        user: {type: mongoose.Schema.Types.ObjectID, ref: 'user'},
        department: {type: mongoose.Schema.Types.ObjectID, ref: 'department'},
        evaluation: {type: Array},
        grade: {type: Number}
    });
staffSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});


const Staff = mongoose.model('staff', staffSchema);
module.exports = Staff;
