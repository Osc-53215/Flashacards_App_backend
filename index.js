const mongoose = require('mongoose');

mongoose
.connect('mongodb+srv://new_user02:Password123@cluster0.ktvb1.mongodb.net/Flashcards?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB...'))
 .catch((err) => console.log(`Could not connect to MongoDB. ERROR: ${err}`));