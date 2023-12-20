const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller')
const { requireAuth} = require('../middleware/auth.middleware');

// router.use(requireAuth);

router.get('/course', teacherController.course);
router.get('/home', teacherController.home);
router.get('/submission', teacherController.submission);
router.get('/downloadAll',teacherController.downloadAll);
module.exports = router;