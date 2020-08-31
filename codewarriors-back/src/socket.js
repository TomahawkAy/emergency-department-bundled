const mongoose = require('mongoose');
let Coordinate = mongoose.model('Coordinate');
let User = mongoose.model('User');
let Task = mongoose.model('Task');
let UserModel = require('./models/userModel');
let StaffModel = require('./models/HRH/Staff');
let DepartmentModel = require('./models/HRH/Department');
let SchedulesModel = require('./models/HRH/Schedule');
let TrainingModel = require('./models/HRH/TrainingLesson');
const SerialPort = require('serialport');
const port = new SerialPort('COM11', {
        baudRate: 9600,
        parser: new SerialPort.parsers.Readline({delimiter: '||'})
    })
;
const port2 = new SerialPort('COM12', {
        baudRate: 9600,
        parser: new SerialPort.parsers.Readline({delimiter: '||'})
    })
;
const parser = port.pipe(new SerialPort.parsers.Readline({ delimiter: '\r\n' }));
const parser2 = port2.pipe(new SerialPort.parsers.Readline({ delimiter: '\r\n' }));
module.exports = (app) => {
    const http = require('http').Server(app);
    let io = require('socket.io')(http);
    let server = io.listen(8000);
    let imageDataURI = require('image-data-uri');
    let path = require('path');
    let user = require('./models/userModel');
    let connected_users = [];
    const passport = require('passport'),
        jwt = require('jsonwebtoken');
    const config = {
        secret: 'ZEZMORDEMSFKLCDLSKFOEPAZOERLKJSD'
    };
    const {on_color_change, on_disconnect, PositionChange, GetAllWait, DriverSetted, MyPosChange, GetAllCurrent, GetAllDone} = require('./services/PositionSoket'),
        {PhoneCallAmbulance, PhoneCallEndsAmbulance, PhoneCallAnswred} = require('./services/PhoneCallsSocket');
    server.on("connection", (socket) => {
        socket.emit("new notification", {content: "New notification from server", isSeen: false});
        socket.on('requesting_prediction', (data) => {
            console.log('react have emmited the event ...');
            socket.broadcast.emit('requesting_prediction_python', data);
        });
        socket.on('prediction_completed', (data) => {
            console.log('prediction completed...');
            socket.broadcast.emit('ready_to_fetch', data);
        });
        socket.on('sending_picture_to_user', (data) => {
            let filePath = './uploads/tmp/loging.jpg';
            let images = [];
            imageDataURI.outputFile(data.data.toString(), filePath).then((res) => {
                let pathURL = path.resolve(res);
                // need to fetch all the users pictures paths
                user.find({}).then((response) => {
                    response.forEach((single) => {
                        if (single.image!==undefined){
                            images.push({_id: single._id, image: path.resolve(single.image)});
                        }
                    });
                    socket.broadcast.emit('requesting_python_image_prediction', {imagePath: pathURL, images: images});
                });
            });
            socket.emit('requesting_python_image_prediction', {imagePath: filePath});
        });
        socket.on('engaged_to_access', (facial_login_response) => {
            // searching for the user by its id :
            console.log(facial_login_response);
            user.findOne({_id: facial_login_response.data}).then((found) => {
                console.log('found ...');
                console.log(found);
                const token = jwt.sign({
                        type: "user",
                        data: {
                            _id: found._id,
                            username: found.username,
                            name: found.name
                        }
                    },
                    config.secret, {
                        expiresIn: 24 * 3600
                    });
                // emitting the socket to the client in order to connect
                socket.broadcast.emit('engaged_to_connect', {
                    success: true,
                    token: "JWT " + token,
                    user: found
                });
            })
            /**/
        });

        socket.on('user_connected', (response) => {
            console.log(response);
            connected_users.push(response);
            socket.broadcast.emit('user_connected', connected_users);
        });

        socket.on('user_disconnected', (response) => {
            console.log(connected_users);
            let tmp_user = connected_users.find((e) => e.response._id.toString() === response.user._id.toString());
            if (tmp_user !== null) {
                console.log('mitsketa :D ....');
                connected_users.splice(connected_users.indexOf(tmp_user), 1);
                socket.broadcast.emit('user_connected', connected_users);
            }

        });

        socket.on('request_connected_users', (response) => {
            socket.emit('request_granted_connected_users', connected_users);
        });

        socket.on('requesting_search_bar', (response) => {
            console.log(response.query);
            let users = [];
            let staffs = [];
            let departments = [];
            let schedules = [];
            let trainings = [];
            UserModel.search({query_string: {query: '*' + response.query + '*'}}, {hydrate: true}, (err, userResult) => {
                if (userResult !== undefined) {
                    users = userResult.hits.hits;
                }
                StaffModel.search({query_string: {query: '*' + response.query + '*'}}, {hydrate: true}, (err, staffResult) => {
                    if (staffResult !== undefined) {
                        staffs = staffResult.hits.hits;
                    }
                    DepartmentModel.search({query_string: {query: '*' + response.query + '*'}}, {hydrate: true}, (err, departmentsResult) => {
                        if (departmentsResult !== undefined) {
                            departments = departmentsResult.hits.hits;
                        }
                        SchedulesModel.search({query_string: {query: '*' + response.query + '*'}}, {hydrate: true}, (err, schedulesResult) => {
                            if (schedulesResult !== undefined) {
                                schedules = schedulesResult.hits.hits;
                                TrainingModel.search({query_string: {query: '*' + response.query + '*'}}, {hydrate: true}, (err, trainingLists) => {
                                        if (trainingLists !== undefined) {
                                            console.log(trainingLists);
                                            trainings = trainingLists.hits.hits;
                                            socket.emit('search_request_finished', {
                                                users, staffs, departments, schedules, trainings
                                            });
                                        }
                                    }
                                )
                            }

                        });
                    })
                })
            })
            // users
            // staff
            // Departments
            // schedules
            // trainings
            /*
            *     await User.search({query_string: {query: '*' + req.params.field + '*'}}, {hydrate: true},
        async function (err, results) {
            data = results.hits.hits;
            Hiring.search({query_string: {query: '*' + req.params.field + '*'}}, {hydrate: true},
                async function (err, results) {
                    await results.hits.hits.forEach((e) => {
                        data.push(e);
                    });
                    await res.json(data);
                    res.end();
                });
        });*/

        });


        socket.on('PositionChange', (data) => {
            //     console.log(data)
            PositionChange(data, socket);
        });
        socket.on('DriverSetted', (data) => {
            DriverSetted(data, socket);
        });
        socket.on('PhoneCallAmbulance', (data) => {
            console.log('socket for call ambulance have been triggered ...');
            PhoneCallAmbulance(data, socket);
        });
        socket.on('PhoneCallAnswred', (data) => {
            PhoneCallAnswred(data, socket);
        });
        socket.on('PhoneCallEndsAmbulance', (data) => {
            PhoneCallEndsAmbulance(data, socket);
        });
        socket.on('MyPosChange', () => {
            MyPosChange(socket);
        });
        socket.on('GetAllWait', () => {
            GetAllWait(socket);
        });
        socket.on('GetAllCurrent', () => {
            GetAllCurrent(socket);
        });
        socket.on('GetAllDone', () => {
            GetAllDone(socket);
        });

        socket.on("disconnect", () => {
            on_disconnect(socket);
        });
        parser.on('data', (data)=>{
            const result=data.toString().split(';');

            result.push('val1')
            console.log(result);
            socket.emit('fetched_iot_data',{data:result});

        });
        parser2.on('data', (data)=>{
            const result=data.toString().split(';');
            result.push('val2')
            console.log("2=",result);
            socket.emit('fetched_iot_data2',{data:result});
        });
    });
};
