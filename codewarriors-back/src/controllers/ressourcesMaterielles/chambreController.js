let mongoose = require('mongoose');
let Chambre = mongoose.model('Chambre');

exports.list_all_chambres = (req, res) => {
    Chambre.find({}, (err, chambre) => {
        if (err)
            res.send(err);
        res.json(chambre);
    });
};

exports.create_a_chambre = (req, res) => {
    var new_chambre = new Chambre(req.body);
    new_chambre.save((err, chambre) => {
        if (err)
            res.send(err);
        res.json(chambre);
    });
};


exports.read_a_chambre = (req, res) => {
    Chambre.findById(req.params.chambreId, (err, chambre) => {
        if (err)
            res.send(err);
        res.json(chambre);
    });
};


exports.update_a_chambre = (req, res) => {
    Chambre.findOneAndUpdate({_id: req.params.chambreId}, req.body, {new: true}, (err, chambre) => {
        if (err)
            res.send(err);
        res.json(chambre);
    });
};
exports.delete_a_chambre = (req, res) => {
    Chambre.remove({
        _id: req.params.chambreId
    }, (err, chambre) => {
        if (err)
            res.send(err);
        res.json({message: 'Chambre successfully deleted'});
    });
};
