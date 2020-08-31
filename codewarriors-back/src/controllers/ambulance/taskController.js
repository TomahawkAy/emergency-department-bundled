let mongoose = require('mongoose');
let Task = mongoose.model('Task');
let User = mongoose.model('User');
let Coordinate = mongoose.model('Coordinate');

module.exports = {
    create: (req, res) => {
        const moment = require('moment');
        const today = moment();

        Task.create({
            date: today.format('YYYY-MM-DD'),
            nurce: req.body.nurce,
            user: req.body.user,
            startPos: req.body.startPos,
            endPos: req.body.endPos
        }, (err, task) => {
            if (err) return res.status(500).json(err);
            res.status(201).json(task)
        })
    },
    showOneById: (req, res) => {
        Task.findById(req.params.id, (err, task) => {
            if (err) return res.status(204).json(err);
            res.status(200).json(task);
        })
    },

    showAll: (req, res) => {
        Task.find((err, task) => {
            res.status(200).json(task);
        })
    },
    showByUserId: (req, res) => {
        if (req.params.t === "driver") {
            Task.find({driver: req.params.id, done: true}, (err, task) => {
                if (err) return res.status(204).json(err);
                res.status(200).json(task);
            }).sort({date: -1})
        } else {
            Task.find({user: req.params.id, done: true}, (err, task) => {
                if (err) return res.status(204).json(err);
                res.status(200).json(task);
            }).sort({date: -1})
        }
    },
    showCurrentByUserId: (req, res) => {
        if (req.params.t === "driver") {
            Task.find({driver: req.params.id, currentTask: true}, (err, task) => {
                if (err) return res.status(204).json(err);
                res.status(200).json(task);
            })
        } else {
            Task.find({user: req.params.id, currentTask: true}, (err, task) => {
                if (err) return res.status(204).json(err);
                res.status(200).json(task);
            })
        }
    },
    showWaitByUserId: (req, res) => {
        if (req.params.t === "driver") {
            Task.find({driver: req.params.id, currentTask: false, done: false}, (err, task) => {
                if (err) return res.status(204).json(err);
                res.status(200).json(task);
            })
        } else {
            Task.find({user: req.params.id, currentTask: false, done: false}, (err, task) => {
                if (err) return res.status(204).json(err);
                res.status(200).json(task);
            })
        }
    },
    showAllCurrent: (req, res) => {
        Task.find({currentTask: true}, (err, task) => {
            if (err) return res.status(204).json(err);
            res.status(200).json(task);
        })
    },
    showAllByIdAndDate: (req, res) => {
        Task.find({driver: req.params.id, date: req.params.date}, (err, task) => {
            if (err) return res.status(204).json(err);
            res.status(200).json(task);
        })
    },
    showAllByDate: (req, res) => {
        Task.find({date: req.params.date}, (err, task) => {
            if (err) return res.status(204).json(err);
            res.status(200).json(task);
        })
    },
    showAllDone: (req, res) => {
        Task.find({done: true}, (err, task) => {
            if (err) return res.status(204).json(err);
            res.status(200).json(task);
        })
    },
    showAllWait: (req, res) => {
        Task.find({done: false, currentTask: false}, (err, task) => {
            if (err) return res.status(204).json(err);
            res.status(200).json(task);
        })
    },
    update: (req, res) => {
        //    console.log(req.body)
        Task.findOneAndUpdate({_id: req.params.id}, req.body, (err, task) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({message: 'successfully updated', task});
        })
    },


    UpdateKlm: (req, res) => {
        Task.findById(req.params.id, (err, task) => {
            if (err) return res.status(204).json(err);
            Task.findOneAndUpdate({_id: req.params.id}, {klm: req.body.klm + task.klm, doneklm: true}, (err, tassk) => {
                if (err) return res.status(500).json(err);
                res.status(200).json({message: 'successfully updated', tassk});
            })
        })
    },

    updateWait: (req, res) => {
        Task.findOneAndUpdate({_id: req.params.id}, {
            nurce: req.body.nurce,
            driver: req.body.driver,
            currentTask: true
        }, (err, task) => {
            User.findOneAndUpdate({_id: req.body.driver}, {
                driverState: true,
            }, (err, user) => {
                if (err) return res.status(500).json(err);
                res.status(200).json({message: 'successfully updated', user, task});
            })
        })

    },
    delete: (req, res) => {
        Task.findByIdAndRemove(req.params.id, (err, task) => {
            if (err) return res.status(500).json(err);
            Coordinate.findByIdAndRemove(task.startPos, (err, coordinate) => {
                if (err) return res.status(500).json(err);
            })
            Coordinate.findByIdAndRemove(task.endPos, (err, coordinate) => {
                if (err) return res.status(500).json(err);
            })
            res.status(200).json({message: 'successfully deleted', task});
        })
    },
};
