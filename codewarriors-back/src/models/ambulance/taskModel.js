const
    mongoose = require('mongoose'),
    taskSchema = new mongoose.Schema({
        date: {type: String},
        currentTask: {type: Boolean, default: false},
        done: {type: Boolean, default: false},
        nurce: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        driver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        klm:{type:Number,default:0},
        doneklm: {type: Boolean, default: false},
        startPos: {type: mongoose.Schema.Types.ObjectId, ref: 'Coordinate'},
        endPos: {type: mongoose.Schema.Types.ObjectId, ref: 'Coordinate'},
        CurrentWay: {
            type: String,
            default: 'OnWay',
            enum: ["OnWay", "WayBack"]
        }
    });


const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
