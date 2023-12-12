const express = require('express');
const router = express.Router();
const listStudentController = require('../controllers/listStudent.controller');
const { requireAuth} = require('../middleware/auth.middleware');

// router.use(requireAuth);

router.get('/list_student', listStudentController.index);

module.exports = router;