module.exports = (app) => {
    let lit = require('../../controllers/ressourcesMaterielles/litController');
    // lit Routes
    app.route('/lit')
        .get(lit.list_all_lits)
        .post(lit.create_a_lit);


    app.route('/lit/:litId')
        .get(lit.read_a_lit)
        .put(lit.update_a_lit)
        .delete(lit.delete_a_lit);
};
