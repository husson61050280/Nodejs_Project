const express = require('express');
const router = express.Router()
const {createStudent, getStudent , matchStudent , addPage , editPage, updateStudent, deleteStudent}  = require('../controllers/controller')

router.get('/', getStudent);
router.get('/add', addPage);
router.get('/edit/:id', editPage);
router.post('/add', createStudent);
router.post('/update/:id', updateStudent);
router.get('/match', matchStudent);
router.get('/delete/:id', deleteStudent);

module.exports = router