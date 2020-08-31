let mongoose = require('mongoose');
let User = mongoose.model('User');
let PhoneCalls = mongoose.model('PhoneCalls');

PhoneCallAmbulance = (data, socket) => {
    User.findById(data.id, (err, user) => {
        if (err) return err;
        let body = {
            callerid: user._id,
            name: user.name || "",
            lastName: user.lastName || "",
            phoneNumber: user.phoneNumber || "",
            cin: user.cin || "",
            email: user.email || ""
        }


        PhoneCalls.create(body, (err, task) => {
            if (err) return err;
            PhoneCalls.find({done: false, answred: false}, (err, calls) => {
                if (err) {
                    console.error(err);
                    return err;
                }
                else {
                    console.log('no errors have been found');
                    socket.broadcast.emit('PhoneCallAmbulance', {calls: calls});
                }
            })
        })
    })

};
PhoneCallAnswred = (data, socket) => {

    PhoneCalls.findOneAndUpdate({callerid: data.id, done: false, answred: false}, {
        answred: true,
    }, (err, task) => {
        if (err) return err;
        PhoneCalls.find({done: false, answred: false}, (err, calls) => {
            if (err) return err;
            socket.broadcast.emit('PhoneCallAmbulance', {calls: calls});
        })
    })
};


PhoneCallEndsAmbulance = (data, socket) => {

    PhoneCalls.find({callerid: data.id, done: false}, (err, ccall) => {


        PhoneCalls.findOneAndUpdate({_id: ccall[0]._id}, {

            done: ccall[0].answred === false || ccall[0].callerEndIt === true || ccall[0].nurceEndIt === true,
            callerEndIt: ccall[0].callerEndIt || (ccall[0].callerEndIt === false && ccall[0].nurceEndIt === false && data.type === "p"),
            nurceEndIt: ccall[0].nurceEndIt || (ccall[0].callerEndIt === false && ccall[0].nurceEndIt === false && data.type === "n"),
        }, (err, task) => {
            if (err) return err;
            PhoneCalls.find({done: false, answred: false}, (err, calls) => {
                if (err) return err;
                socket.broadcast.emit('PhoneCallEndsAmbulance', {calls: calls});
            })
        })
    });

};
module.exports = {
    PhoneCallAmbulance, PhoneCallEndsAmbulance, PhoneCallAnswred
};
