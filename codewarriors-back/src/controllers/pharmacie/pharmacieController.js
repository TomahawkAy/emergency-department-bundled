let mongoose = require('mongoose');
let Medicament = mongoose.model('Medicament');


exports.list_of_Scrapped_medicaments = function(req,res) {

    const request = require('request');
    const cheerio = require('cheerio');

    request('http://www.phct.com.tn/index.php/catalogue/medicament-humain', (error, response, html) => {
        if (!error) {
            const $ = cheerio.load(html);
            var list = [];

            $('#___libelle> option').each((index, el) => {
                const item = $(el).text();
                list.push(item);
            });
        }
        filtredList = list.filter(medicament => medicament != "Veuillez choisir");
        res.json(filtredList);
    });

};

exports.list_all_medicaments = (req, res) => {
    Medicament.find({}, (err, medicament) => {
        if (err)
            res.send(err);
        res.json(medicament);
    });
};

exports.create_a_medicament = (req, res) => {
    var new_medicament = new Medicament(req.body);
    new_medicament.save((err, medicament) => {
        if (err)
            res.send(err);
        res.json(medicament);
    });
};


exports.read_a_medicament = (req, res) => {
    Medicament.findById(req.params.medicamentId, (err, medicament) => {
        if (err)
            res.send(err);
        res.json(medicament);
    });
};


exports.update_a_medicament = (req, res) => {
    Medicament.findById(req.params.medicamentId, (err, myMedicament) => {
        if (err)
            res.send(err);
        let  nvQuantite = Number(myMedicament.quantite_med) + Number(req.body.quantite_med)
        Medicament.findOneAndUpdate({_id: req.params.medicamentId}, {$set: {quantite_med: nvQuantite}}, {new: true}, (err, medicament) => {
            if (err)
                res.send(err);
            res.json(medicament);
        });
    });
};
exports.delete_a_medicament = (req, res) => {
    Medicament.remove({
        _id: req.params.medicamentId
    }, (err, medicament) => {
        if (err)
            res.send(err);
        res.json({message: 'Medicament successfully deleted'});
    });
};
