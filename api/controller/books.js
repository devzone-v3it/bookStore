const mongoose = require('mongoose');

const Book = require('../models/books');

exports.GetBooksAll = async (req, res, next) => {
    try{
        const books =  await Book.find().exec();
        await res.status(200).json({
            count: books.length,
            books: books.map((book) => {
                return {
                    _id: book._id,
                    title: book.title,
                    author: book.author,
                    price: book.price,
                    pub_year: book.pub_year,
                    version: book.version,
                    genre: book.genre,
                    request: {
                        type: 'GET',
                        url: 'localhost:3000/books/'+book._id
                    }
                }
            })
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            error: err
        })
    }
};

exports.CreateNewBook = async (req, res, next) =>{
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        version: req.body.version,
        pub_year: req.body.year,
        price: req.body.price,
        genre: req.body.genre
    })
    try{
        await book.save();
        res.status(200).json({
            message: `Book ${book.title} added successfully to the DB`,
            info: {
                _id: book._id,
                title: book.title,
                author:book.author,
                version: book.version,
                price: book.price,
                pub_year: book.pub_year,
                genre: book.genre,
                request:{
                    type: 'GET',
                    url: "localhost:3000/books/"+book._id
                }
            }
        });
    }
    catch(err){
        res.status(500).json({
            status:500,
            error: err
        })
    }
};

exports.GetBook_usingBookId = async (req, res, next) => {
    try{
        const book = await Book.findOne({_id: req.params.bookId}).exec();

        await res.status(200).json({
            _id: book._id,
            title: book.title,
            author: book.author,
            price: book.price,
            pub_year: book.pub_year,
            version: book.version,
            genre: book.genre,
            request: {
                type: 'GET',
                url: 'localhost:3000/books/'+book._id
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:500,
            error: err
        })
    }
};

exports.DeleteBook_usingBookId = async (req, res, next) => {
    try{
        await Book.deleteOne({_id: req.params.bookId}).exec();

        await res.status(200).json({
            status:200,
            message: `Book ${req.params.bookId} removed from store`,
            request: {
                type: 'POST',
                url: 'localhost:3000/books',
                body:{
                    title: '<String>',
                    author: 'String>',
                    version: '<String>',
                    price: '<Number>',
                    year: '<YYYY: Number>',
                    genre: '<[<object>] Array'
                }
            }
        })
    }
    catch(err){
        res.status(500).json({
            message: 500,
            error: err
        })
    }
}