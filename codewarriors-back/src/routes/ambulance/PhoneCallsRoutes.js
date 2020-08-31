module.exports = (app) => {
    const
        callsCtrl = require('../../controllers/ambulance/PhoneCallsController');

    app.route('/PhoneCalls/allWait')
        .get(callsCtrl.GetAllPhoneCallsWait);
    app.route('/PhoneCalls/Last')
        .get(callsCtrl.GetAllPhoneCallsLast);
    app.route('/PhoneCalls/update/ans/:id')
        .put(callsCtrl.updateAns);
};
