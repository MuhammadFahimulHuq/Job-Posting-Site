var express = require('express');
var router = express.Router();
var {ensureAuthenticated} = require('../../config/auth')
var securedController = require('../../controllers/secured/securedController')


router.get('/home',ensureAuthenticated,securedController.show_home);


module.exports = router;