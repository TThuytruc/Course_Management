const express = require('express');
const router = express.Router();
const listStudentController = require('../controllers/listStudent.controller');
router.get('/list_student', listStudentController.index);
router.post('/loadListStudent',listStudentController.loadListStudent);
module.exports = router;