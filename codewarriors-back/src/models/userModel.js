const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    plugin=require('mongoosastic'),
    userSchema = new mongoose.Schema({
        name: {type: String},
        lastName: {type: String},
        phoneNumber: {type: Number},
        cin:{type: String,unique: true},
        description:{type: String},
        driverState:{type:Boolean, default: false},
        email: {type: String, required: true, unique: true,trim: true},
        password: {type: String, required: true},
        coordinate:  {type: mongoose.Schema.Types.ObjectId, ref: 'Coordinate'},
        role: {
            type: String,
            default: 'patient',
            enum: ["doctor", "nurse", "admin","driver","patient","pharmacist"]
        },
        statusNurse: {type: String, default: 'libre'},
        codePatient:{type: String},
        analyses:{},
        statePatient:{type: String},
        statusDoctor:{type: String},
        statusSort:{type: String},
        notification: {type: Array},
        image: {type: String}
    });


userSchema.plugin(plugin, {
    host: "127.0.0.1",
    port: 9200,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
