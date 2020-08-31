const express = require('express'),
    UserModel = require('./../models/userModel'),
    UserBusiness = require('./../controllers/userController'),
    router = express.Router(),
    passport = require('passport'),
    jwt = require('jsonwebtoken');
const config = {
    secret: 'ZEZMORDEMSFKLCDLSKFOEPAZOERLKJSD'
};
router.post('/register-user', (req, res) => {
    console.log(req);
    let newUser = new UserModel({
        name: req.body.name,
        lastName:req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        image: req.body.image,
        cin:req.body.cin
    });
    UserBusiness.newUser(newUser, (err, user) => {
        if (err) {
            let message = '';
            if (err.errors.username) message = "username already exists";
        } else return res.json({
            success: true,
            message: 'user registration is completed',
        });
    })
});
module.exports.userRoute = (app) => {

    const
        usersCtrl = require('../controllers/userController'),
        verifyToken = require('../../serverAuth.js').verifyToken;


    app.route('/GetAllFreeDriver').get(usersCtrl.GetAllFreeDriver);
    app.route('/GetOneBy/CIN/:cin').get(usersCtrl.GetOneByCin);

    app.route('/')
        .get(usersCtrl.index)
        .post(usersCtrl.create);

    router.post('/login', (req, res) => {
        const username = req.body.email;
        const password = req.body.password;
        UserBusiness.findUserByEmail(username, (err, user) => {
            if (err) throw err;
            if (!user) {
                return res.json({
                    success: false,
                    message: 'email not found'
                });
            }
            UserBusiness.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({
                            type: "user",
                            data: {
                                _id: user._id,
                                username: user.username,
                                name: user.name
                            }
                        },
                        config.secret, {
                            expiresIn: 24 * 3600
                        });
                    return res.json({
                        success: true,
                        token: "JWT " + token,
                        user: user
                    });
                } else return res.json({
                    success: false,
                    message: "not found"
                })
            });
        })
    });

    //-----------------------------------------------------------------

    app.route('/add_patient').post(usersCtrl.createPatient);

    app.route('/findByCode/:codePatient').get(usersCtrl.findByCode);

    app.route('/getPatients').get(usersCtrl.getPatients);

    app.route('/findById/:id').get(usersCtrl.findById);

    app.route('/updatePatient/:id/:role').put(usersCtrl.updatePatient);




    app.route('/getDoctors').get(usersCtrl.getDoctors);
    app.route('/:id').get(usersCtrl.show).put(usersCtrl.update);


    //-----------------------------------------------------------------

    router.get('/get-all', passport.authenticate('admin-rule', {session: false}), (req, res) => {
        UserBusiness.fetchUsers((err, users) => {
            console.log('mazelt ....');
            res.json(users);
        });
    });


};
module.exports.route = router;
