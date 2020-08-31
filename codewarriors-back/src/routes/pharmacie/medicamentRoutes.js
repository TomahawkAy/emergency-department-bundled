module.exports = (app) => {
    let medicament = require('../../controllers/pharmacie/pharmacieController.js');
    // medicament Routes
    app.route('/medicament')
        .get(medicament.list_all_medicaments)
        .post(medicament.create_a_medicament);

    app.route('/scrappedMed').get(medicament.list_of_Scrapped_medicaments);

    app.route('/medicament/:medicamentId')
        .get(medicament.read_a_medicament)
        .put(medicament.update_a_medicament)
        .delete(medicament.delete_a_medicament);
};
