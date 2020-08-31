module.exports = (app) => {
    const
        taskCtrl = require('../../controllers/ambulance/taskController');

    app.route('/taskD/getAll/').post(taskCtrl.create).get(taskCtrl.showAll);
    app.route('/taskD/getAll/done').get(taskCtrl.showAllDone);
    app.route('/taskD/getAll/wait').get(taskCtrl.showAllWait).put(taskCtrl.updateWait);
    app.route('/taskD/getAll/updateWait/:id').put(taskCtrl.updateWait);
    app.route('/taskD/getAll/current').get(taskCtrl.showAllCurrent);
    app.route('/taskD/getAll/ByDate/:date').get(taskCtrl.showAllByDate);
    app.route('/taskD/getOneBy/IdAndDate/:id/:date').get(taskCtrl.showAllByIdAndDate);



    app.route('/taskD/getOneById/:id').get(taskCtrl.showOneById).put(taskCtrl.update).delete(taskCtrl.delete);

    app.route('/taskD/userDriver/:t/:id').get(taskCtrl.showByUserId);
    app.route('/taskD/CurrentTask/:t/:id').get(taskCtrl.showCurrentByUserId);
    app.route('/taskD/WaitTask/:t/:id').get(taskCtrl.showWaitByUserId);



    app.route('/taskD/update/klmdone/:id').put(taskCtrl.UpdateKlm);


};
