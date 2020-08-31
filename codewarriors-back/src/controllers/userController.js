let mongoose = require('mongoose');
let User = mongoose.model('User');
let bcrypt = require('bcrypt');
let Coordinate = mongoose.model('Coordinate');

const signToken = require('../../serverAuth.js').signToken;
const refreshToken = require('../../serverAuth.js').refreshToken;


module.exports = {
    findUserById: (_id, callback) => {
        const query = {_id};
        User.findOne(query, callback);
    },
    index: (req, res) => {
        User.find({}, (err, users) => {
            res.json(users)
        })
    },
    getUser:(_id)=> {
        return User.findOne({_id});
    },
    GetAllFreeDriver: (req, res) => {
        User.find({driverState: false, role: "driver"}, (err, task) => {
            if (err) return res.status(204).json(err);
            res.status(200).json(task);
        })
    },
    GetOneByCin: (req, res) => {
        User.findOne({cin: req.params.cin}, (err, task) => {
            if (err) return res.status(204).json(err);
            res.status(200).json(task);
        })
    },
    // get one user
    show: (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err)
                res.send(err);
            res.json(user);
        })
    },
    findUserByEmail: (email, callback) => {
        const query = {email};
        User.findOne(query, callback);
    },

    // create a new user
    create: (req, res) => {
        User.create(req.body, (err, user) => {
            if (err) return res.status(500).json({success: false, code: err});
            // once user is created, generate a token to "log in":
            const token = signToken(user);
            Coordinate.create({latitude: 34.79536530000001, longitude: 10.7117455}, (err, coordinate) => {
                if (err) return res.status(500).json(err);
                User.findOneAndUpdate({_id: user._id}, {coordinate: coordinate}, (err, user) => {
                    if (err) return res.status(500).json(err);
                    res.json({success: true, message: "User created. Token attached.", token})
                })
            })
        })
    },
    newUser: (newUser, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save(callback);
            })})},
    // update an existing user
    update: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, req.body, (err, user) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({message: 'successfully updated', user});
        })
    },
    comparePassword: (password, hash, callback) => {
        bcrypt.compare(password, hash, (err, isMatched) => {
            if (err) throw  err;
            callback(null, isMatched);
        })
    },

    fetchUsers: async (callback) => {
        await User.find({}, callback);
        console.log('finished :D')
    },
    // the login routex
    authenticate: (req, res) => {
        // check if the user exists
     //   console.log("xx" + req.body.email);
        User.findOne({email: req.body.email}, (err, user) => {
            // if there's no user or the password is invalid
            if (!user || !user.validPassword(req.body.password)) {
                // deny access
                return res.json({success: false, message: "Invalid credentials."})
            }
            const token = signToken(user);
            res.json({success: true, message: "Token attached.", token})
        })
    },

//----------------------------------------------------------------------------------
    createPatient: (req, res) => {
        let newUser = req.body;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;


                User.create(newUser, (err, user) => {
                    if (err)
                        return res.status(500).json({success: false, code: err.code});
                    res.json({success: true, message: "User created. Token attached."})
                })




            })})





    },
    findByCode: (req, res) => {
        User.find({codePatient:req.params.codePatient}, (err, user) => {
            if (err)
                res.send(err);
            res.json(user);
        })
    },
    findById: (req, res) => {
        User.find({_id:req.params.id}, (err, user) => {
            if (err)
                res.send(err);
            res.json(user);
        })
    },
    getPatients: (req, res) => {
        User.find({role:"patient"}, (err, users) => {
            res.json(users)
        })
    },
    updatePatient: (req, res) => {

        const updatedInformation=req.body

        console.log("role=",req.params.role)



        if(req.params.role==="p"){
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(updatedInformation.password, salt, (err, hash) => {
                    if (err) throw err;
                    updatedInformation.password = hash;

                    User.findOneAndUpdate({"_id":req.params.id},{...updatedInformation},(err,data)=>{
                        if(err) {
                            res.send('notfound')
                        }
                        else{
                            res.send('user updated')
                        }
                    })

                })})
        }
        else{
            User.findOneAndUpdate({"_id":req.params.id},{...updatedInformation},(err,data)=>{
                if(err) {
                    res.send('notfound')
                }
                else{
                    res.send('user updated')
                }
            })

        }



    },
    getDoctors: (req, res) => {
        User.find({role:"doctor"}, (err, users) => {
            res.json(users)
        })
    },
//----------------------------------------------------------------------------------

    refresh: (req, res) => {
        const token = refreshToken(req.body.token);
        res.json({success: true, message: "Token attached.", token})
    },
};
