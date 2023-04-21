const express = require('express');
const userCtrl = require('../controller/users');
router = express.Router();

router.post('/signup', userCtrl.Signup_user);

router.post('/login', userCtrl.Login_user)

module.exports = router;