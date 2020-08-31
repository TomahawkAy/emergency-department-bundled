let mongoose = require('mongoose');
let Coordinate = mongoose.model('Coordinate');
let User = mongoose.model('User');
let Task = mongoose.model('Task');


on_color_change = (data, socket) => {
//    console.log(`changing color to ${data.color} ...`);
    //  socket.emit('change-color', {color: "Blue Nigga lala"});
    // socket.broadcast.emit('change-color2', {color: "Blue Nigga lala"});
};

on_disconnect = (socket) => {
   // console.info(`Client gone [id=${socket.id}]`);

};

// PositionInfo = (data, socket) => {
//     Coordinate.findById(data.id, (err, coordinate) => {
//         if (err) return err;
//         axios({
//             method: 'get',
//             url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinate.latitude}&lon=${coordinate.longitude}&accept-language=fr`,
//         }).then(
//             (add) => {
//                 socket.emit('PositionInfo', {data: add.data});
//             }
//         );
//     })
// };


PositionChange = (data, socket) => {

    User.findById(data.id, (err, user) => {
        if (err) return err;
        Coordinate.findOneAndUpdate({_id: user.coordinate}, data.coord, (err, result) => {
            if (err) return err;
            socket.broadcast.emit('PositionChange', {dataC: result, dataU: user});
        })
    })
};
DriverSetted = (data, socket) => {
    Task.findOneAndUpdate({_id: data.id}, {
        nurce: data.nurce,
        driver: data.driver,
        currentTask: true
    }, (err, task) => {
        User.findOneAndUpdate({_id: data.driver}, {
            driverState: true,
        }, (err, user) => {
            if (err) return err;
            Coordinate.findById(user.coordinate, (err, coordinate) => {
                if (err) return err;
                socket.broadcast.emit('DriverSetted', {task: task, latitude: coordinate.latitude, longitude: coordinate.longitude});
            })
        })
    })
};
GetAllWait = (socket) => {
    Task.find({done: false, currentTask: false}, (err, task) => {
        if (err) return err;
        socket.broadcast.emit('GetAllWait', {task: task});
    })
};
GetAllCurrent = (socket) => {
    Task.find({currentTask: true}, (err, task) => {
        if (err) return err;
        socket.broadcast.emit('GetAllCurrent', {task: task});
    })
};
GetAllDone = (socket) => {
    Task.find({done: true}, (err, task) => {
        if (err) return err;
        socket.broadcast.emit('GetAllDone', {task: task});
    })
};
MyPosChange=(socket)=>{
    socket.emit('MyPosChange');
};


module.exports = {
    on_color_change, on_disconnect,  PositionChange, DriverSetted, GetAllWait,MyPosChange,GetAllCurrent,GetAllDone
};
