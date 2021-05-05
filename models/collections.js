const mongoose = require('mongoose');
const Joi = require('joi');
const Flashcard = require("./flashcards")

const collectionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cards: [Flashcard.schema]
})

const Collection = mongoose.model('Collection', collectionSchema);

// function validateFlashcard(flashcard) {
//     const schema = Joi.object({
//         name: Joi.string().min(2).max(50).required(),
//     })
// }



module.exports = Collection;