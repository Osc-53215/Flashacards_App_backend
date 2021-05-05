const {Collection} = require('../models/collections');
const {Flashcard, validate, flashcardSchema} = require('../models/flashcards');
const express = require('express');
const router = express.Router();

// POST

router.post('/:collectionId/cards/:flashcardId', async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

        const flashcard = await Flashcard.findById(req.params.flashcardId);
        if (!flashcard) return res.status(400).send(`The collection with id "${req.params.flashcardId}" does not exist.`);

        collection.cards.push(flashcard);

        await collection.save()
        return res.send(collection.cards);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//PUT

router.put('/:collectionId/cards/:flashcardId', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error);

        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

        const flashcard = collection.cards.id(req.params.flashcardId);
        if (!flashcard) return res.status(400).send(`The collection with id "${req.params.flashcardId}" does not exist.`);

        
            flashcard.name = req.body.name,
            flashcard.description = req.body.description,
            flashcard.category =  req.body.category,
  

        await collection.save();

        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send('Internal Server Error: ' + ex);
    }
})

module.exports = router;