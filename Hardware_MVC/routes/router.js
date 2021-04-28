const express = require('express');
const router = express.Router()
const {homePage , render_AddmaterialPage , render_AddtypePage , add_material , add_type}  = require('../controllers/controller')

router.get('/', homePage);
router.get('/add_material', render_AddmaterialPage);
router.get('/add_type', render_AddtypePage);
router.post('/add_material', add_material );
router.post('/add_type', add_type);
// router.get('/edit_material/:id', editPage);
// router.post('/add', createStudent);
// router.post('/update/:id', updateStudent);
// router.get('/match', matchStudent);
// router.get('/delete/:id', deleteStudent);

module.exports = router