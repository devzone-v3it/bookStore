const express = require('express');
// import controllers
const bookCtrl = require('../controller/books');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();



router.get('/', bookCtrl.GetBooksAll);

router.post('/',checkAuth, bookCtrl.CreateNewBook);

router.get('/:bookId', bookCtrl.GetBook_usingBookId);

router.put('/:bookId',checkAuth, bookCtrl.UpdateBook_usingBookId);

router.delete('/:bookId', checkAuth, bookCtrl.DeleteBook_usingBookId);


module.exports = router