const express = require('express');
const router = express.Router()
const {createUser, HomePage , getUserTopTen ,getUserWin, addPage , addDistancePage, addDistance, deleteStudent}  = require('../controllers/controller')

router.get('/', HomePage);
router.get('/add', addPage);
router.get('/add_distance', addDistancePage);
router.get('/show_userTopTen', getUserTopTen);
router.get('/show_userWin',getUserWin);
router.post('/add', createUser);
router.post('/add_distance', addDistance);


module.exports = router