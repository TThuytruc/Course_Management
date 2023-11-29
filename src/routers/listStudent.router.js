const express = require('express');
const router = express.Router();
const listStudentController = require('../controllers/listStudent.controller');

router.get('/', listStudentController.index);

module.exports = router;