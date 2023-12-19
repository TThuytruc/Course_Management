const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller')


// router.use(requireAuth);

router.post('/insert', courseController.insert);
router.post('/delete/:id', courseController.delete);


// req.params.slug

module.exports = router;