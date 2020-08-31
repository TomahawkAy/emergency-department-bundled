module.exports = (app) => {
    let sejour = require('../../controllers/ressourcesMaterielles/sejourController');
    // lit Routes
    app.route('/sejour')
        .get(sejour.list_all_sejour)
        .post(sejour.create_a_sejour);

    app.route('/autReleaseNurseAndBed').get(sejour.autReleaseNurseAndBed);
    app.route('/sejour/:sejourId')
        .get(sejour.read_a_sejour)
        .put(sejour.update_a_sejour)
        .delete(sejour.delete_a_sejour);
};
