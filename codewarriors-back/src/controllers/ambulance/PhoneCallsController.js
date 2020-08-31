let mongoose = require('mongoose');
let PhoneCalls = mongoose.model('PhoneCalls');
module.exports = {

    GetAllPhoneCallsWait: (req, res) => {
        PhoneCalls.find({done:false,answred:false},(err, task) => {
            res.status(200).json(task);
        })
    },
    GetAllPhoneCallsLast: (req, res) => {
        PhoneCalls.find({done:true},(err, task) => {
            res.status(200).json(task);
        }).sort({date : -1})
    },

    updateAns: (req, res) => {
        PhoneCalls.findOneAndUpdate({callerid: req.params.id,done:false,answred:false}, {
            answred: true,
        }, (err, task) => {
            if (err) return res.status(204).json(err);
            PhoneCalls.find({done:false,answred:false},(err, calls) => {
                if (err) return res.status(204).json(err);
                res.status(200).json(calls);
            })
        })

    },


};
