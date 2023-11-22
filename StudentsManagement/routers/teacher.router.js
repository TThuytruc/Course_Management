const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller')

router.get('/course', teacherController.course);
router.get('/home', teacherController.home);
router.get('/submission', teacherController.submission);

// req.params.slug

module.exports = router;