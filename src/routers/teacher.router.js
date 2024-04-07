const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller')
const { requireAuth} = require('../middleware/auth.middleware');

router.get('/course', teacherController.course);
router.get('/home', teacherController.home);
router.get('/submission', teacherController.submission);
router.post('/submission/import_score', teacherController.submissionImportScore);
router.post('/submission/import_final_score', teacherController.submissionImportFinalScore);
router.post('/downloadAll',teacherController.downloadAll);
router.post('/updateScore',teacherController.updateScore);
router.post('/downloadSingle',teacherController.downloadSingle);
module.exports = router;