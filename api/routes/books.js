const express = require('express');
// import controllers
const bookCtrl = require('../controller/books');

const router = express.Router();



router.get('/', bookCtrl.GetBooksAll);

router.post('/', bookCtrl.CreateNewBook);

router.get('/:bookId', bookCtrl.GetBook_usingBookId);

router.put('/:bookId', bookCtrl.UpdateBook_usingBookId);

router.delete('/:bookId', bookCtrl.DeleteBook_usingBookId);


module.exports = router