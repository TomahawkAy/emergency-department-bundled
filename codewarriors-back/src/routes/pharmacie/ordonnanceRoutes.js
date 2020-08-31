module.exports = (app) => {
    let ordonnance = require('../../controllers/pharmacie/ordonnanceController');
    // ordonnance Routes
    app.route('/ordonnance')
        .get(ordonnance.list_all_ordonnances)
        .post(ordonnance.create_a_ordonnance);
    app.route('/ordonnanceByUserId/:userId').get(ordonnance.read_a_ordonnanceUser);
    app.route('/ordonnance/:ordonnanceId')
        .get(ordonnance.read_a_ordonnance)
        .delete(ordonnance.delete_a_ordonnance);
};
