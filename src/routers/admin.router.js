const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { requireAuth} = require('../middleware/auth.middleware');

// router.use(requireAuth);

router.get('/course', adminController.course);
router.get('/home', adminController.home);
router.post('/deleteAllTeacher',adminController.DeleteAllTeacher);
router.post('/deleteAllStudent',adminController.DeleteAllStudent);

// req.params.slug

module.exports = router;