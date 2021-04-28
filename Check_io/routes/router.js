const express = require('express');
const router = express.Router()
const {homePage , generateIO}  = require('../controllers/controller')

router.get('/', homePage);
router.post('/generateIO', generateIO);
module.exports = router