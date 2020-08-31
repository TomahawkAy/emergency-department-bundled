let mongoose = require('mongoose');
let Sejour = mongoose.model('Sejour');
let Lit = mongoose.model('Lit');
let User = mongoose.model('User');

exports.list_all_sejour = (req, res) => {
    Sejour.find({}).populate('lit').populate('patient').populate('nurse').exec(
        (err, o ) => {
            res.json(o);
        }
    )
};

exports.autReleaseNurseAndBed = (req, res) => {
    Sejour.find({}, (err, sejour) => {
        if (err)
            res.send(err);
        sejour.forEach(function (elem) {
           if (new Date().getTime() > elem.date_fin.getTime() ) {
               console.log(elem);
               Lit.findOneAndUpdate({_id: elem.lit}, {$set: {status_lit: 'libre'}}, {new: true}, (err, lit) => {
                   if (err)
                       res.send(err);
               });
               User.findOneAndUpdate({_id: elem.nurse}, {$set: {statusNurse: 'libre'}}, {new: true}, (err, nurse) => {
                   if (err)
                       res.send(err);
               });
           }
        }
    );
        res.json(sejour);
    });
};


exports.create_a_sejour = (req, res) => {
    var new_sejour = new Sejour(req.body);
    new_sejour.save((err, sejour) => {
        if (err)
            res.send(err);
        Lit.findOneAndUpdate({_id: sejour.lit}, {$set: {status_lit: 'occupé'}}, {new: true}, (err, lit) => {
            if (err)
                res.send(err);
        });
        User.findOneAndUpdate({_id: sejour.nurse}, {$set: {statusNurse: 'occupé'}}, {new: true}, (err, nurse) => {
            if (err)
                res.send(err);
        });
        res.json(sejour);
    });
};

exports.read_a_sejour = (req, res) => {
    Sejour.findById(req.params.sejourId, (err, sejour) => {
        if (err)
            res.send(err);
        res.json(sejour);
    });
};


exports.update_a_sejour = (req, res) => {
    Sejour.findOneAndUpdate({_id: req.params.sejourId}, req.body, {new: true}, (err, sejour) => {
        if (err)
            res.send(err);
        res.json(sejour);
    });
};
exports.delete_a_sejour = (req, res) => {
    Sejour.remove({
        _id: req.params.sejourId
    }, (err, sejour) => {
        if (err)
            res.send(err);
        res.json({message: 'Sejour successfully deleted'});
    });
};
