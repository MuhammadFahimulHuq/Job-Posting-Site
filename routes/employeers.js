var express= require('express');
var router = express.Router();
var employeers = require('../controllers/employeers');

router.get('/signup',employeers.show_signup);


router.get('/login',employeers.show_login);


module.exports = router;