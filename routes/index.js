var express = require('express');
var router = express.Router();
var index = require('../controllers/index')
/* GET home page. */
router.get('/', index.show_home);
/* GET login page. */
router.get('/login', index.show_login);
/* GET SignUp page. */
router.get('/signup', index.show_signup);

module.exports = router;
