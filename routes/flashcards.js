const Flashcard = require('../models/flashcards');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        
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