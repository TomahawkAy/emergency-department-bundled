const express = require('express');
const router = express.Router();
const passport = require('passport');
const StaffBusiness = require('../../controllers/HRH/StaffController');
const StaffModel = require('../../models/HRH/Staff');
const UserBusiness = require('./../../controllers/userController');
const UserModel = require('./../../models/userModel');
const AppointmentModel = require('./../../models/HRH/Appointment');
const fs = require('fs');
let imageDataURI = require('image-data-uri');
let path = require('path');
const config = {
    secret: 'ZEZMORDEMSFKLCDLSKFOEPAZOERLKJSD'
};

// @Works perfectly
router.get('/all', passport.authenticate('admin-rule', {session: false}), (req, res) => {
    let staffs = [];
    let users = [];
    let result = [];
    let appointments = [];
    AppointmentModel.find({}).then((appointmentsResult) => {
        appointments = appointmentsResult;
        StaffModel.find({}).then((staff) => {
            staffs = staff;
            UserModel.find({}).then((user) => {
                users = user;
            }).then(() => {
                staffs.forEach((e) => {
                    users.forEach((x) => {
                        if (e.user.toString() === x._id.toString()) {
                            let response = {
                                user_id: x._id,
                                name: x.name,
                                lastName: x.lastName,
                                phoneNumber: x.phoneNumber,
                                email: x.email,
                                role: x.role,
                                staffType: e.staffType,
                                salary: e.salary,
                                grade: e.grade
                            };
                            let APPOINTMENT = appointments.filter((a) => a.staff.toString() === e.user.toString());
                            if (APPOINTMENT !== undefined) {
                                response.appointments = APPOINTMENT;
                                console.log('andou appointment');
                            } else {
                                console.log('maandouch appointment');
                                console.log(APPOINTMENT);
                            }
                            console.log(response);
                            result.push(response);
                        } else console.log('not matched...');
                    })
                });
                console.log('finished');
                res.json(result);

            })
        })
    });

});

// @Works perfectly
router.post('/new', passport.authenticate('admin-rule', {session: false}), (req, res) => {
    console.log(req.files.image);
    let parserU = JSON.parse(req.body.staff);
    let newUser = new UserModel({
        name: parserU.name,
        lastName: parserU.lastName,
        phoneNumber: parserU.phoneNumber,
        email: parserU.email,
        password: parserU.password,
        role: parserU.role,
        cin: String(parserU.cin)
    });
    let filePath = './uploads/staff/' + newUser.name + '.png';
    fs.writeFile(filePath, req.files.image.data, 'base64', (err => {
        if (!err) {
            newUser.image = filePath;
            UserBusiness.newUser(newUser, (err, user) => {
                if (err) {
                    let message = '';
                    console.log('there was been an error ..........');
                    console.log(err);
                } else {
                    let stf = {
                        staffType: parserU.staffType,
                        salary: parserU.salary,
                        user: user._id,
                        grade: 0,
                        department: parserU.department
                    };

                    StaffBusiness.newStaff(stf, (err, success) => {
                        if (err) {
                            console.log('an error have been occurred');
                        } else {
                            let response = {
                                user_id: user._id,
                                name: user.name,
                                lastName: user.lastName,
                                phone: user.phone,
                                email: user.email,
                                role: user.role,
                                staffType: success.staffType,
                                salary: success.salary,
                                grade: success.grade
                            };
                            let Coordinate = mongoose.model('Coordinate');
                            Coordinate.create({
                                latitude: 34.79536530000001,
                                longitude: 10.7117455
                            }, (err, coordinate) => {
                                if (err) return res.status(500).json(err);
                                UserModel.findOneAndUpdate({_id: user._id}, {coordinate: coordinate}, (err, user) => {
                                    if (err) return res.status(500).json(err);
                                    return res.json(response);
                                })
                            });

                        }
                    });
                }
            })
        }
    }))


});

// @Works perfectly
router.post('/delete', passport.authenticate('admin-rule', {session: false}), (req, res) => {
    let _id = req.body._id;
    StaffBusiness.removeStaff(_id).then(() => {
        UserModel.deleteOne({_id: _id}).then(() => {
            res.json({'operation': 'staff deleted', _id: _id});
        })
    })
});

module.exports = router;
