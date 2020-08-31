let mongoose = require('mongoose');
module.exports = {
    newTraining(training, callback) {

    },
    newTrainingSection(section, callback) {

    },
    newSectionLesson(lesson, callback) {
        lesson.save(callback);
    },
    getTrainings(callback) {

    },
    getTrainingById(id, callback) {

    },
    deleteTrainingLesson(section, lesson, callback) {

    },
    deleteTrainingSection(section, training, callback) {

    },
    deleteTraining(training, callback) {

    }

};
