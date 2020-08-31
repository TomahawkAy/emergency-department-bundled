module.exports = (app) => {
    const
        coordinateCtrl = require('../../controllers/ambulance/coordinateController');
    app.route('/Coordinate/StartPos/:id')
        .post(coordinateCtrl.createForTaskStartPos);


    app.route('/Coordinate/EndPos/:id')
        .post(coordinateCtrl.createForTaskEndPos);

    app.route('/Coordinate/GetCoordByUserID/:id')
        .get(coordinateCtrl.GetCoordByUserID);

    app.route('/Coordinate/Coordinate/:id')
        .post(coordinateCtrl.create)
        .get(coordinateCtrl.showOneById)
        .put(coordinateCtrl.update)
        .delete(coordinateCtrl.delete);


};
