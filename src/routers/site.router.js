const express = require('express');
const router = express.Router();
const siteController = require('../controllers/site.controller');

router.get('/login', siteController.login_get);
router.post('/login', siteController.login_post);
router.get('', (req,res,next) => {
    res.redirect('/login');
})

module.exports = router;