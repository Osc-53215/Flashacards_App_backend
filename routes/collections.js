const {Collection} = require('../models/collection');
const{Flashcard, validate} = require('../models/flashcards');
const express = require('express');
const router = express.Router();

// GET

router.get('/', async (req, res) => {
    try {
        const collection = await Collection.find();
        return res.send(collection);
    }   catch (ex) {
        return res.status(500).send(`Inetrnal Server Error: ${ex}`);
    }
});

//GET by ID

router.get('/:id', async (req, res) => {
    try {

        const collection = await Collection.findById(req.params.id);

        if (!collection)
            return res.status(400).send(`The flashcard with the id '${req.params.id}' does not exist.`);
        return res.send(collection);

    }   catch (ex) {
        return res.status(500).send(`Inetrnal Server Error: ${ex}`);
    }
})


// POST

router.post('/', async (req, res) => {
    try{
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
   
});

// GET FLASHCARD ENDPOINT

router.get('/:collectionId/cards', async (req, res) => {
    try {

        const collection = await Collection.findById(req.params.collectionId);

        if (!collection)
            return res.status(400).send(`The flashcard with the id '${req.params.id}' does not exist.`);
        return res.send(collection.cards);

    }   catch (ex) {
        return res.status(500).send(`Inetrnal Server Error: ${ex}`);
    }
})




router.post('/:collectionId/cards', async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

         const flashcard = new Flashcard({
            name: req.body.name,
            description: req.body.description,
            category:  req.body.category,
        });

        collection.cards.push(flashcard);

        await collection.save()
        return res.send(collection.cards);
    }catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

//PUT

router.put('/:id', async (req, res) => {
    try{
        const flashcard = collection.cards.id(
            req.params.flashcardId,
            {
            name: req.body.name,
            cards: []
        },
        {new: true}
        );
        
        if (!flashcard)
         return res.status(400).send(`The collection with id "${req.params.flashcardId}" does not exist.`);

        await flashcard.save()
        return res.send(flashcard)
    }
    catch{
        return res.status(500).send(`Internal Server Error: ${ex}, naw`);
    }
   
});

// DELETE

router.delete('/:collectionId/cards/:flashcardId', async (req, res) => {
    try {

        const collection = await Collection.findById(req.params.collectionId);
        if (!collection) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

        let flashcard = collecton.cards.is(req.params.flashcardId);
        if (!flashcard) return res.status(400).send(`The collection with id "${req.params.flashcardId}" does not exist.`);

        product = await product.remove();

        await collection.save();
        return res.send(flashcard);

    }   catch(ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    } 
});



module.exports = router;