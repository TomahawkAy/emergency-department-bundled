const express = require('express');
const router = express.Router();
const passport = require('passport');
const ScheduleBusiness = require('../../controllers/HRH/ScheduleController');
const config = {
    secret: 'ZEZMORDEMSFKLCDLSKFOEPAZOERLKJSD'
};


// @Works perfectly
router.post('/new', passport.authenticate('admin-rule', {session: false}), (req, res) => {
    let schedule = req.body;
    ScheduleBusiness.newSchedule(schedule).then((response) => {
        res.json(response);
    });
});

// @Works perfectly
router.post('/delete', passport.authenticate('admin-rule', {session: false}), (req, res) => {
    let _id = req.body;
    ScheduleBusiness.deleteSchedule(_id).then((response) => {
        res.json(_id);
    });
});

// @Works perfectly
router.get('/all', passport.authenticate('admin-rule', {session: false}), (req, res) => {
    ScheduleBusiness.fetchSchedules().then((response) => {
        res.json(response);
    });
});

router.post('/mark-appointment',passport.authenticate('others-rule',{session:false}),(req,res)=>{
   ScheduleBusiness.newAppointment(req.body).then((response)=>{
       /* To implement the penalization logic here after testing appointment*/
   });
});


module.exports = router;
