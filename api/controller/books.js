const mongoose = require('mongoose');
const Book = require('../models/books');

// Get All Books using GET method
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
                        url: '/books/'+book._id
                    }
                }
            })
        });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            status: 500,
            error: err + " in GET /books"
        })
    }
};

// Create new Book Object using POST method
exports.CreateNewBook = async (req, res, next) =>{

    const newBook = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        version: req.body.version,
        pub_year: req.body.year,
        price: req.body.price,
        genre: req.body.genre
    })
    try{
        const book = await Book.findOne({title: req.body.title, author: req.body.author}).exec();

        if (!book){
            await newBook.save();
            res.status(200).json({
                message: `Book ${newBook.title} added successfully to the DB`,
                info: {
                    _id: newBook._id,
                    title: newBook.title,
                    author:newBook.author,
                    version: newBook.version,
                    price: newBook.price,
                    pub_year: newBook.pub_year,
                    genre: newBook.genre,
                    request:{
                        type: 'GET',
                        url: "/books/"+newBook._id
                    }
                }
            });
        } 
        else{
            res.status(409).json({
                status:409,
                message: 'The book with same title and author name exists. To make changes to the given book, follow the below PUT mehtod',
                request:{
                    type: 'PUT',
                    url: '/books/'+ book._id
                }
            });
        }
        
    }
    catch(err){
        res.status(500).json({
            status:500,
            error: err + "in POST /books"
        })
    }
};

// Get a book using its BookID using GET method
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
                url: '/books/'+book._id
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status:500,
            error: err + ` in GET /books/${req.params.bookId}`
        })
    }
};

// Update structure of Book object using PUT method
exports.UpdateBook_usingBookId = async (req, res, next) => {

    try{
        const book = await Book.findOneAndUpdate({_id: req.params.bookId}, req.body);
        if(book){
            res.status(200).json({
                status:200,
                updatedRecord: book,
                parameters: req.body
            })
        }
        else{
            res.status(404).json({
                status:404,
                message: "Record with given ID is not found. Make sure id exists"
            })
        }
    }
    catch(err) {
        res.status(500).json({
            status: 500,
            error: err + ' in PUT /books' + req.params.bookId 
        })
    }
} 

// Delete Book object returned by its BookID using DELETE method
exports.DeleteBook_usingBookId = async (req, res, next) => {
    try{
        const book = await Book.findOne({_id: req.params.bookId}).exec();
        if(book){
            await Book.deleteOne({_id: req.params.bookId}).exec();

            await res.status(204).json({
                status:204,
                message: `Book ${req.params.bookId} removed from store`,
                request: {
                    type: 'POST',
                    url: '/books',
                    body:{
                        title: '<String>',
                        author: 'String>',
                        version: '<String>',
                        price: '<Number>',
                        year: '<YYYY: Number>',
                        genre: '<[<object>] Array'
                    }
                }
            });
        }
        else{
            await res.status(404).json({
                status: 404,
                message: "The resource you want to delete is not found"
            });
        }
        
    }
    catch(err){
        res.status(500).json({
            message: 500,
            error: err + ` in DELETE /books/${req.params.bookId}`
        });
    }
};