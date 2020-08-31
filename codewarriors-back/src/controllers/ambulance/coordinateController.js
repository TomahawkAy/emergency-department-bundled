let mongoose = require('mongoose');
let Coordinate = mongoose.model('Coordinate');
let User = mongoose.model('User');
let Task = mongoose.model('Task');
let axios = require('axios');
module.exports = {
    create: (req, res) => {
        Coordinate.create(req.body, (err, coordinate) => {
            if (err) return res.status(500).json(err);
            User.findOneAndUpdate({_id: req.params.id}, {coordinate:coordinate}, (err, user) => {
                if (err) return res.status(500).json(err);
                res.status(200).json({message: 'successfully updated',coordinate,user});
            })
        })
    },
    createForTaskStartPos: (req, res) => {
        Coordinate.create(req.body, (err, coordinate) => {
            if (err) return res.status(500).json(err);
            Task.findOneAndUpdate({_id: req.params.id}, {startPos:coordinate}, (err, Task) => {
                if (err) return res.status(500).json(err);
                res.status(200).json({message: 'successfully updated',coordinate,Task});
            })
        })
    },
    createForTaskEndPos: (req, res) => {
        Coordinate.create(req.body, (err, coordinate) => {
            if (err) return res.status(500).json(err);
            Task.findOneAndUpdate({_id: req.params.id}, {endPos:coordinate}, (err, Task) => {
                if (err) return res.status(500).json(err);
                res.status(200).json({message: 'successfully updated',coordinate,Task});
            })
        })
    },
    showOneById: (req, res) => {
        Coordinate.findById(req.params.id, (err, coordinate) => {
            if (err) return res.status(204).json(err);
            axios({
                method: 'get',
                url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinate.latitude}&lon=${coordinate.longitude}&accept-language=fr`,
            }).then(
                (add) => {
                    res.status(200).json(add.data)
                }
            );
        })
    },

    GetCoordByUserID: (req, res) => {
        User.findById(req.params.id, (err, user) => {
            if (err)
                res.send(err);
            Coordinate.findById(user.coordinate, (err, coordinate) => {
                if (err) return res.status(204).json(err);
            //    console.log(coordinate)
                res.status(200).json(coordinate)
            })
        })
    },
    update: (req, res) => {
        Coordinate.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, coordinate) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({message: 'successfully updated',coordinate});
        })
    },
    delete: (req, res) => {
        Coordinate.findByIdAndRemove(req.params.id, (err, coordinate) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({message: 'successfully deleted'});
        })
    },
};
