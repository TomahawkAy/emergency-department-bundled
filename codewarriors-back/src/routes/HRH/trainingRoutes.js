const express = require('express');
const TrainingLesson = require('../../models/HRH/TrainingLesson');
const trainingBusiness = require('../../controllers/HRH/TrainingController');
const TrainingSectionModel = require('../../models/HRH/TrainingSection');
const TrainingModel = require('../../models/HRH/Training').Training;
const fs = require('fs');
const router = express.Router();


router.post('/new', async (req, res) => {
    let keys = Object.keys(req.files);
    let response = [];
    let files = [];
    let lessons = JSON.parse(req.body.lessons);
    let sections = JSON.parse(req.body.sections);
    const cmd = require('child_process');
    keys.forEach((key) => {
        files.push(req.files[key]);
    });
    let training = JSON.parse(req.body.training);
    let image = files.find((criteria) => criteria.mimetype === "image/png");
    let newTraining = new TrainingModel(training);
    newTraining.trainingImage.data = image.data;
    newTraining.trainingImage.contentType = image.mimetype;
    files.forEach((e) => {
        fs.writeFile('./uploads/trainings/' + e.name, e.data, (err) => {
            if (err)
                console.log('error have occured');
        });
    });
    await newTraining.save((err, training) => {
        if (!err) {
            let text = '';
            sections.forEach((section) => {
                let sectionModel = new TrainingSectionModel(section);
                sectionModel.training = training._id;
                sectionModel.save((err, lastSection) => {
                    let sectionlessons = lessons.filter((s) => s.section === lastSection.name);
                    console.log('length of the section courses is :' + sectionlessons.length);
                    console.log(sectionlessons);
                    let fileI = 0;
                    sectionlessons.forEach((element) => {
                        let lessonFile = files.find((file) => file.name === element.fileName);
                        if (lessonFile !== undefined) {
                            console.log('lesson is mawjoud ...');
                            let description = cmd.execSync('translator  ./uploads/trainings/' + lessonFile.name + ' sounder.mp3 file' + fileI + '.wav').toString();
                            fs.unlinkSync('./file' + fileI + '.wav');
                            console.log('executing the command ...');
                            if (sectionlessons.length > 0) {
                                let Lesson = new TrainingLesson({
                                    name: element.name,
                                    videoFile: './uploads/trainings/' + lessonFile.name,
                                    section: lastSection._id,
                                    textContent: description
                                });
                                trainingBusiness.newSectionLesson(Lesson, (error, success) => {
                                    console.log('created to database');
                                });
                                response.push({lesson: Lesson});
                            }

                        }

                    });
                });
            });

        } else {
            console.error('Training couldnt be added to db ...');
        }

    });
    return res.json(response);
});


router.get('/all', (req, res) => {
    let response = [];
    let trainings = [];
    let sections = [];
    let lessons = [];
    TrainingModel.find({}).then((responseTrainings) => {
        trainings = responseTrainings;
        TrainingSectionModel.find({}).then(responseSections => {
            sections = responseSections;
            TrainingLesson.find({}).then((lessonsResponse) => {
                lessons = lessonsResponse;
                trainings.forEach((t) => {
                    sections.forEach((s) => {
                        lessons.forEach((l) => {
                            if (l.section.toString() === s._id.toString() && s.training.toString() === t._id.toString()) {
                                console.log('we have a match :D');
                                let result = {
                                    training: t,
                                    section: s,
                                    lesson: l,
                                };
                                response.push(result);
                            }
                        });
                    });
                });
                res.json({lessons: response, sections: sections, trainings: trainings});
            })
        })
    });
});


router.get('/get-training/:id', (req, res) => {
    let responses = [];
    let sections = [];
    let lessons = [];
    console.log(req.params.id);
    TrainingModel.findOne({_id: req.params.id}).then(response => {
        TrainingSectionModel.find({training: response._id}).then((secs) => {
            sections = secs;
            TrainingLesson.find({}).then((result) => {
                lessons = result;
                sections.forEach((section) => {
                    lessons.forEach((single) => {
                        if (section._id.toString() === single.section.toString()) {
                            console.log('matched :D');
                            let fileContent = fs.readFileSync(single.videoFile);
                            //converting it to base 64
                            let result = {
                                training: response,
                                section: section,
                                lesson: single,
                            };
                            responses.push(result);
                        }
                    })
                });
                console.log(responses);
                res.json(responses);
            });
        });
    })
});


router.get('/streamVideo/:id', (req, res) => {
    let id=req.params.id;
    TrainingLesson.findOne({_id:id}).then((response)=>{
        console.log(id);
        res.set('Content-Type', 'video/mp4');
        let source = fs.createReadStream(response.videoFile);
        source.pipe(res);
    });

});

module.exports = router;
