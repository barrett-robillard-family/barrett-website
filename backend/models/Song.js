const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const SongSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String
    },
    albumArt: {
        type: String
    },
    year: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Song', SongSchema);