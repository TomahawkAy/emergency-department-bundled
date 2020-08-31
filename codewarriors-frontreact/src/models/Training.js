export class Training {

    constructor(training) {
        this.name = training.name;
        this.description = training.description;
        this.ratingAverage = training.ratingAverage;
        this.subscriptions = training.subscriptions;
        this.fromTrainingRequest = training.fromTrainingRequest;
        this.trainingRequest = training.trainingRequest;
        this.trainingImage = training.trainingImage
    }
}

export default Training
