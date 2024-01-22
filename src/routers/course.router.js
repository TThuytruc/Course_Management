const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller')

router.post('/insert', courseController.insert);
router.post('/delete/:id', courseController.delete);
router.post('/insertTopic', courseController.insertTopic);
router.post('/insertExercise', courseController.insertExercise);

module.exports = router;