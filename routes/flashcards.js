const {Flashcard, validate} = require('../models/flashcards')
const {Collection, validateCollection} = require('../models/collection')
const express = require('express');
const router = express.Router();

// GET

router.post('/card', async (req, res) => {
    try{
        const {error} = validateCollection(req.body);
        if (error)
            return res.status(400).send(error);

        const collection = new Collection({
            name: req.body.name,
            cards: []
        })
        let result = await collection.save()
        return res.send(result)
    }
    catch{
        return res.status(500).send(`Internal Server Error: ${ex}, naw`);
    }
   
})

router.get('/', async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        return res.send(flashcards);
    }   catch (ex) {
        return res.status(500).send(`Inetrnal Server Error: ${ex}`);
    }
})

// GET BY ID

router.get('/:id', async (req, res) => {
    try {

        const flashcard = await Flashcard.findById(req.params.id);

        if (!flashcard)
            return res.status(400).send(`The flashcard with the id '${req.params.id}' does not exist.`);
        return res.send(flashcard);

    }   catch (ex) {
        return res.status(500).send(`Inetrnal Server Error: ${ex}`);
    }
})

// POST

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

//  PUT 

router.put('/', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const flashcard = await Flashcard.findByIdAndUpdate(
            req.params.id,
            {
            name: req.body.name,
            description: req.body.description,
            category:  req.body.category,
        },
        {new: true}
    );

    if (!flashcard)
        return res.status(400).send(`The flashcard with the id '${req.params.id}' does not exist.`);

        await flashcard.save();

        return res.send(flashcard);
    } catch (ex) {
        return res.status(500).send('Internal Server Error: ' + ex);
    }
})

//  DELETE

router.delete('/:id', async (req, res) => {
    try {

        const flashcard = await Flashcard.findByIdAndRemove(req.params.id);

        if (!flashcard)
            return res.status(400).send(`The flashcard with the id '${req.params.id}' does not exist.`);
        return res.send(flashcard);

    }   catch (ex) {
        return res.status(500).send(`Inetrnal Server Error: ${ex}`);
    }
})





module.exports = router;