module.exports = (app) => {
    let chambre = require('../../controllers/ressourcesMaterielles/chambreController');
    // lit Routes
    app.route('/chambre')
        .get(chambre.list_all_chambres)
        .post(chambre.create_a_chambre);


    app.route('/chambre/:chambreId')
        .get(chambre.read_a_chambre)
        .put(chambre.update_a_chambre)
        .delete(chambre.delete_a_chambre);
};
