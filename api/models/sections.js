// describes the collection of a book in a particular chamber
const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sectionCode: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Book', 
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Section', sectionSchema);