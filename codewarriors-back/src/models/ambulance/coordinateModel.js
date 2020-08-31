const
    mongoose = require('mongoose'),
    coordinateSchema = new mongoose.Schema({
        latitude: {type: Number, required: true},
        longitude: {type: Number, required: true},
    });

const Coordinate = mongoose.model('Coordinate', coordinateSchema);
module.exports = Coordinate;
