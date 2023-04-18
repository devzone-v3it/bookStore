const express = require('express');

const router = express.Router();

// import controllers
const bookCtrl = require('../controller/books');

router.get('/', bookCtrl.GetBooksAll);

router.post('/', bookCtrl.CreateNewBook);

router.get('/:bookId', bookCtrl.GetBook_usingBookId);


module.exports = router