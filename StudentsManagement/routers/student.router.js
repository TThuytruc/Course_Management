const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller')
// Define a controller to handle route "/news" in "app/controllers"

router.get('/course', studentController.course);
router.get('/home', studentController.home);
router.get('/submission', studentController.submission);

// req.params.slug

module.exports = router;