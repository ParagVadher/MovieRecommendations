// require mongoose
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Movie = mongoose.model('Contact', movieSchema);

module.exports=Movie;