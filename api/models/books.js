const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    version: {
        type: String,
        required: true,
        default: "1.0"
    },
    pub_year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        requred: true
    },
    genre: {
        type: Array
    }
});

module.exports = mongoose.model('Book', bookSchema);