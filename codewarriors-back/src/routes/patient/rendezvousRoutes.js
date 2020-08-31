module.exports = (app) => {


    const rdvCtrl = require('../../controllers/patient/rendezvousController');


    app.route('/add_rendezvous').post(rdvCtrl.createRdv);

    app.route('/findRdvByDoctor/:id').get(rdvCtrl.findRdvByDoctor);

    app.route('/findRdvByDate/:mydate').get(rdvCtrl.findRdvByDate);

    app.route('/findRdvByDateDoctor/:myfulldate/:idDoctor').get(rdvCtrl.findRdvByDateDoctor);

    app.route('/findRdvByDatePatient/:myfulldate/:idPatient').get(rdvCtrl.findRdvByDatePatient);

    app.route('/findRdvByPatient/:idPatient').get(rdvCtrl.findRdvByPatient);

    app.route('/deleteRDV/:idRDV').delete(rdvCtrl.deleteRDV);








};
