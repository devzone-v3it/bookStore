const express = require('express');
const sectionCtrl = require('../controller/sections');

const router = express.Router();

router.get('/', sectionCtrl.GetSection_all);
router.get('/:sectionId', sectionCtrl.GetSection_usingSectionId);

router.post('/', sectionCtrl.CreateNewSection);

module.exports = router;