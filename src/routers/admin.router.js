const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/course', adminController.course);
router.get('/home', adminController.home);
// req.params.slug

module.exports = router;