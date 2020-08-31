const express = require('express');
const router = express.Router();
const passport = require('passport');
let AppointmentBusiness = require('../../controllers/HRH/AppointmentController');
let ScheduleModel = require('../../models/HRH/Schedule');
let StaffModel = require('../../models/HRH/Staff');
let DepartmentModel = require('../../models/HRH/Department');
let AppointmentModel = require('../../models/HRH/Appointment');
const config = {
    secret: 'ZEZMORDEMSFKLCDLSKFOEPAZOERLKJSD'
};

router.get('/all', passport.authenticate('admin-rule', {session: false}), (req, res) => {
    AppointmentBusiness.getAppointments().then((data) => {
        res.json(data);
    })
});

router.post('/new', passport.authenticate('others-rule', {session: false}), (req, res) => {
    let appointment = req.body;
// case where there is only an entry appointment
// searching for the staff
    StaffModel.findOne({user: appointment.user}).then((staff) => {
        // searching for the department :
        DepartmentModel.findOne({_id: staff.department}).then((department) => {
            console.log(department);
            // searching for the schedule :
            ScheduleModel.findOne({_id: department.work_schedule}).then((schedule) => {
                // logics goes there :
                if (schedule !== null) {
                    let exitTolerance = schedule.toleranceExit.split(':');
                    let maxDayPenExitLimit = schedule.maxDayPenExitLimit.split(':');
                    if (appointment._id === -1) {
                        let newAppointment = new AppointmentModel();
                        // probably an entry appointment bcs there are no appointment :
                        let entryTime = appointment.entryTime.split(':');
                        newAppointment.entry = appointment.entryTime;
                        newAppointment.staff = appointment.user;
                        console.log(entryTime);
                        //entry time
                        let entryHour = Number.parseInt(entryTime[0]);
                        let entryMinute = Number.parseInt(entryTime[1]);
                        let entryTolerance = schedule.toleranceEntry.split(':');
                        let maxEntryDay = schedule.maxDayPenEntryLimit.split(':');
                        console.log(entryTolerance);
                        if ((entryHour > Number.parseInt(entryTolerance[0])) ||
                            ((entryHour === Number.parseInt(entryTolerance[0])) &&
                                (entryMinute > Number.parseInt(entryTolerance[1])))) {
                            newAppointment.penalizedInEntry = true;
                            // tolerance time have been surpassed ...
                            if ((entryHour > Number.parseInt(maxEntryDay[0])) ||
                                ((entryHour === Number.parseInt(maxEntryDay[0])) &&
                                    (entryMinute > Number.parseInt(maxEntryDay[1])))) {
                                console.log('day limit have been surpassed');
                                console.log(maxEntryDay);
                                newAppointment.penalizedByDay = true;
                                newAppointment.salaryPen = schedule.penaltyPerDay;

                            } else {
                                let minutesPen = (Number.parseInt(entryTolerance[1]) - entryMinute);
                                let penaltySum = ((entryHour - Number.parseInt(entryTolerance[0])) * 60 - minutesPen);
                                console.log('time limited have surpassed  ' + penaltySum);
                                newAppointment.penalizedByMinutes = true;
                                newAppointment.salaryPen = penaltySum * schedule.penaltyPerMinute;

                            }
                        } else {
                            console.log(Number.parseInt(entryTolerance[1]));
                            console.log(entryMinute);
                            console.log(entryMinute > Number.parseInt(entryTolerance[1]));
                            console.log('tolerance have been accepted');
                        }
                        newAppointment.save().then((r) => {
                            res.json(r);
                        });
                        // fetching from the schedule ?
                    } else {
                        // if the user have appointed in the morning
                        // will look for the appointment ....
                        AppointmentModel.findOne({_id: appointment._id}, (err, resultAppointment) => {
                                if (resultAppointment.exit === undefined || resultAppointment.exit === null || resultAppointment.exit === '') {
                                    resultAppointment.exit = appointment.exitTime;
                                    let exitTime = appointment.exitTime.split(':');
                                    let exitHour = Number.parseInt(exitTime[0]);
                                    let exitMinute = Number.parseInt(exitTime[1]);
                                    if ((exitHour < Number.parseInt(exitTolerance[0])) ||
                                        ((exitHour === Number.parseInt(exitTolerance[0])) &&
                                            (exitMinute < Number.parseInt(exitTolerance[1])))) {
                                        resultAppointment.penalizedInExit = true;
                                        // tolerance time have been surpassed ...
                                        if ((exitHour < Number.parseInt(maxDayPenExitLimit[0])) ||
                                            ((exitHour === Number.parseInt(maxDayPenExitLimit[0])) &&
                                                (exitMinute < Number.parseInt(maxDayPenExitLimit[1])))) {
                                            if (!resultAppointment.penalizedByDay) {
                                                console.log('day limit have been surpassed');
                                                resultAppointment.penalizedByDay = true;
                                                resultAppointment.salaryPen = schedule.penaltyPerDay;
                                            }

                                        } else {
                                            let minutesPen = Number.parseInt(exitTolerance[1]) - exitMinute;
                                            let penaltySum = ((Number.parseInt(exitTolerance[0]) - exitHour) * 60 + minutesPen) * schedule.penaltyPerMinute;
                                            console.log('penalty is ' + penaltySum);
                                            resultAppointment.penalizedByMinutes = true;
                                            resultAppointment.salaryPen += penaltySum;
                                        }
                                    } else {
                                        console.log('tolerance exit have been accepted');
                                    }
                                    console.log(resultAppointment);
                                    resultAppointment.save().then((resultA) => {
                                        res.json(resultA);
                                    })
                                } else {
                                    res.json({message: 'your appointment is already accomplished'})
                                }
                            }
                        )
                    }
                }
            });
        })
    });
});

router.get('/get-by-user/:id', ((req, res) => {
    console.log(req.params.id);
    let staff = StaffModel.findOne({user: req.params.id}).then((response) => {
        if (response !== undefined && response !== null) {
            let date = new Date();
            let appointment = {};
            console.log(date);
            AppointmentModel.find({staff: response.user}).then((result) => {
                    console.log(result);
                    result.forEach((single) => {
                        console.log(single);
                        console.log('found the targeted user');
                        if (single.date.getDay() === date.getDay()) {
                            console.log('same day found :D');
                            appointment = single;
                        }
                    });
                    res.json(appointment);
                }
            )
        }

    });


}));


module.exports = router;
