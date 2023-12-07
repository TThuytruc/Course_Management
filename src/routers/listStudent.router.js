const express = require('express');
const router = express.Router();
const listStudentController = require('../controllers/listStudent.controller');
<<<<<<< HEAD
router.get('/list_student', listStudentController.index);
=======
const { requireAuth} = require('../middleware/auth.middleware');

// router.use(requireAuth);

router.get('/', listStudentController.index);

>>>>>>> 5341b4e294837ef2c0e611b110d470bba5260880
module.exports = router;