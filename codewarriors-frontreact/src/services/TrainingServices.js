import Training from "../models/Training";
import axios from "axios";

export class TrainingServices {
    static fetchTrainings() {
        const training = new Training({
            name: 'training1',
            description: 'no description',
            ratingAverage: 10,
            trainingSections: 'selecting pi',
            subscriptions: [],
            fromTrainingRequest: true,
            trainingRequest: 'pret',
            trainingImage: 'meeh'
        });
        const training2 = new Training({
            name: 'training2',
            description: 'no description',
            ratingAverage: 20,
            trainingSections: 'selecting pi2',
            subscriptions: [{name: 'Atef'}, {name: 'Hamdi'}],
            fromTrainingRequest: true,
            trainingRequest: 'paret',
            trainingImage: 'meeah'
        });
        let array = [];
        array.push(training);
        array.push(training2);
        return array;
    }

    static async newTraining(form) {
        let url = "http://localhost:3000/training/new";
        let options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        let response = await axios.post(url, form, options);
        return response.data;
    }

    static getTrainings() {
        return axios.get('http://localhost:3000/training/all');
    }

    static getTrainingDetailsById(_id) {
        return axios.get('http://localhost:3000/training/get-training/' + _id);
    }
}

export default TrainingServices;
