const {Flashcard, validate} = require('../models/flashcards')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        return res.send(flashcards);
    }   catch (ex) {
        return res.status(500).send(`Inetrnal Server Error: ${ex}`);
    }
})













router.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const flashcard = new Flashcard({
            name: req.body.name,
            description: req.body.description,
            category:  req.body.category,
        });

        await flashcard.save();

        return res.send(flashcard);

    } catch (ex) {
        return res.status(500).send('Internal Server Error: ' + ex);
    }
})


module.exports = router;