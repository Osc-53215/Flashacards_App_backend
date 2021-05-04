const connectDB = require('./startup/db');
const express = require('express');
const app = express();

connectDB();

app.use(express.json());

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});