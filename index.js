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
const sectionRoutes = require('./api/routes/sections');
const userRoutes = require('./api/routes/users');

app.use('/books', bookRoutes);
app.use('/sections', sectionRoutes);
app.use('/user', userRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(PORT);



