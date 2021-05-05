const mongoose = require('mongoose');
const Joi = require('joi');
const {flashcardSchema} = require("./flashcards")

const collectionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    isGoldMember: {type: Boolean, default: false},
    cards: {type: [flashcardSchema], default: []},
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
exports.collectionSchema = collectionSchema;
