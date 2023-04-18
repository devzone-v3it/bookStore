// imports
const express = require('express');
const mongoose = require('mongoose');

// initialize app 
const app = express();

// env params
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URL);

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
const bookRoutes = require('./api/routes/books');



app.use('/books', bookRoutes);

app.listen(PORT);



