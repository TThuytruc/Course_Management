const express = require('express');
const router = express.Router();
const listStudentController = require('../controllers/listStudent.controller');
const { requireAuth} = require('../middleware/auth.middleware');

// router.use(requireAuth);

router.get('/', listStudentController.index);
router.post('/updateFinalScore',listStudentController.updateFinalScore);
module.exports = router;