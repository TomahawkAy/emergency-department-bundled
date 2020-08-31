const mongoose = require('mongoose');
const plugin = require('mongoosastic');
const departmentSchema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    work_schedule: {type: mongoose.Schema.Types.ObjectID, ref: 'schedule'},
});
departmentSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});
const Department = mongoose.model('department', departmentSchema);
module.exports = Department;
