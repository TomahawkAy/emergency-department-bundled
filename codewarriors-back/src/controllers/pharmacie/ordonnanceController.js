let mongoose = require('mongoose');
let Ordonnance = mongoose.model('Ordonnance');
let Medicament = mongoose.model('Medicament');

exports.list_all_ordonnances = (req, res) => {
    Ordonnance.find({}).populate('medicament').populate('user').populate('chambre').exec(
        (err, o ) => {
            res.json(o);
        }
    )
};

exports.create_a_ordonnance = (req, res) => {

    //Twilio Message Start
    const accountSid = 'AC354866324190c7677c295fde66444574';
    const authToken = '968c434ef8ffb5146d8e8d0ad08f4ca9';
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: 'une ordonnance médicale a été passé par un médecin',
            from: '+17479998401',
            to: '+21623879127'
        })
        .then(message => console.log(message.sid));
    //Twilio Message End

   Medicament.findById(req.body.medicament, (err,myMed) => {
       var new_ordonnance = new Ordonnance(req.body);
       new_ordonnance.save((err, ordonnance) => {
           if (err)
               res.send(err);
           Medicament.findOneAndUpdate(req.body.medicament, {$set: {quantite_med: myMed.quantite_med - req.body.quantite_med_ordonnance}}, (err, medicament) => {
               if (err)
                   res.send(err);
           });
           res.json(ordonnance);
       });
   });
};


exports.read_a_ordonnance = (req, res) => {
    Ordonnance.findById(req.params.ordonnanceId, (err, ordonnance) => {
        if (err)
            res.send(err);
        res.json(ordonnance);
    })
};

exports.read_a_ordonnanceUser = (req, res) => {
    Ordonnance.find({user :req.params.userId}).populate('medicament').populate('user').exec(
        (err, o ) => {
            res.json(o);
        }
    )
};


exports.delete_a_ordonnance = (req, res) => {
    Ordonnance.remove({
        _id: req.params.ordonnanceId
    }, (err, ordonnance) => {
        if (err)
            res.send(err);
        res.json({message: 'Ordonnance successfully deleted'});
    });
};
