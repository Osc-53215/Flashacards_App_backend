const mongoose = require('mongoose');
const Joi = require('joi');

const flashcardSchema = new mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

function validateFlashcard(flashcard) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        description: Joi.string().required(),
        category: Joi.string().min(2).max(50).required(), 
    })
    return schema.validate(product);
}

exports.Flashcard = Flashcard;
exports.validate = validateFlashcard;
exports.flashcardSchema = flashcardSchema;

module.exports = Flashcard;