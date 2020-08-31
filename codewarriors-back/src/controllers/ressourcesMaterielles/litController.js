let mongoose = require('mongoose');
let Lit = mongoose.model('Lit');

exports.list_all_lits = (req, res) => {
    Lit.find({}).populate('user').exec(
        (err, o ) => {
            res.json(o);
        }
    )
};

exports.create_a_lit = (req, res) => {
    var new_lit = new Lit(req.body);
    new_lit.save((err, lit) => {
        if (err)
            res.send(err);
        res.json(lit);
    });
};


exports.read_a_lit = (req, res) => {
    Lit.findById(req.params.litId, (err, lit) => {
        if (err)
            res.send(err);
        res.json(lit);
    });
};


exports.update_a_lit = (req, res) => {
    Lit.findOneAndUpdate({_id: req.params.litId}, req.body, {new: true}, (err, lit) => {
        if (err)
            res.send(err);
        res.json(lit);
    });
};
exports.delete_a_lit = (req, res) => {
    Lit.remove({
        _id: req.params.litId
    }, (err, lit) => {
        if (err)
            res.send(err);
        res.json({message: 'Lit successfully deleted'});
    });
};
