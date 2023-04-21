const express = require('express');
const sectionCtrl = require('../controller/sections');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.get('/', sectionCtrl.GetSection_all);
router.get('/:sectionId', sectionCtrl.GetSection_usingSectionId);

router.post('/',checkAuth, sectionCtrl.CreateNewSection);

router.delete('/:sectionId', sectionCtrl.DeleteSection_usingSectionId);

module.exports = router;