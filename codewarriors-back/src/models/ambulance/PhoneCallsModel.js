const
    moment = require('moment'),
    today = moment(),
    mongoose = require('mongoose'),
    taskSchema = new mongoose.Schema({
        callerid: {type: String},
        name: {type: String},
        lastName: {type: String},
        phoneNumber: {type: String},
        cin: {type: String},
        email: {type: String},
        date: {type: String, default: today.format('YYYY-MM-DD')},
        done: {type: Boolean, default: false},
        answred: {type: Boolean, default: false},
        callerEndIt: {type: Boolean, default: false},
        nurceEndIt: {type: Boolean, default: false},
    });


const PhoneCalls = mongoose.model('PhoneCalls', taskSchema);
module.exports = PhoneCalls;
