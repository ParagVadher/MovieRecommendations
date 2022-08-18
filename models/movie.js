// require mongoose
const mongoose = require('mongoose');

//movie schema
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now,
        required: true
    }
});

// Movie will be its name in the db and Movie0 to export 
const Movie0 = mongoose.model('Movie', movieSchema);

module.exports=Movie0;