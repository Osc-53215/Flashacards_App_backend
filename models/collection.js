const mongoose = require('mongoose');
const Joi = require('joi');
const Flashcard = require("./flashcards")

const collectionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cards: {type: [Flashcard.flashcardSchema], default: []},
});

const Collection = mongoose.model('Collection', collectionSchema);

function validateCollection(collection) {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema.validate(collection);
}

exports.Collection =  Collection;
exports.validate = validateCollection;

