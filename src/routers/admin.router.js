const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { requireAuth} = require('../middleware/auth.middleware');

// router.use(requireAuth);

router.get('/course', adminController.course);
router.get('/home', adminController.home);
router.post('/deleteAllTeacher',adminController.DeleteAllTeacher);
router.post('/deleteAllStudent',adminController.DeleteAllStudent);
<<<<<<< HEAD
router.post('/deleteUser',adminController.DeleteUserInCourse);
router.post('/addTeacher',adminController.AddTeacherToCourse);
router.post('/addStudent',adminController.AddStudentToCourse);
=======
router.post('/import', adminController.importExcelFile);
router.post('/importTeacher', adminController.importExcelFileTeacher);


>>>>>>> 4cc285fc60211952c19b17b3852d96c3ec894f30
// req.params.slug

module.exports = router;

