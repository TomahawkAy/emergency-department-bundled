const express = require('express');
const router = express.Router();
const passport = require('passport');
const DepartmentBusiness = require('../../controllers/HRH/DepartmentController');
const Schedule = require('../../models/HRH/Schedule');
const config = {
    secret: 'ZEZMORDEMSFKLCDLSKFOEPAZOERLKJSD'
};
router.post('/new', passport.authenticate('admin-rule', {session: false}), (req, res) => {
    /*
    * @ To be updated
    * */
    let department = req.body;
    DepartmentBusiness.newDepartment(department).then((response) => {
        res.json(response);
    });
});

router.post('/delete', passport.authenticate('admin-rule', {session: false}), (req, res) => {
    let _id = req.body._id;
    DepartmentBusiness.deleteDepartment(_id).then((response) => {
        res.json({_id});
    });
});

router.get('/all', passport.authenticate('admin-rule', {session: false}), (req, res) => {
    let schedules = [];
    let departments = [];
    let result = [];
    DepartmentBusiness.fetchDepartments().then((response) => {
        departments = response;
    }).then(() => {
        Schedule.find({}).then((scheds) => {
            console.log(scheds);
            schedules = scheds;
            schedules.forEach((e) => {
                departments.forEach((d) => {
                    console.log(e._id);
                    console.log(d.work_schedule);
                    if (e._id.toString() === d.work_schedule.toString()) {
                        console.log('matched ...');
                        result.push({
                            _id: d._id,
                            name: d.name,
                            description: d.description,
                            work_schedule: e
                        });
                    }
                })
            });
            res.json(result);
        })
    });
});


module.exports = router;
