var express = require('express');
var router = express.Router();
var index = require('../controllers/index')
var auth = require('../controllers/auth')

//multer
var path= require('path');
var mongoose = require('mongoose')
var multer = require('multer');
var GridFsStorage= require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var methodOverride = require('method-override');
var crypto = require('crypto');

var UserModel = require('../models/Users')

const {ensureAuthenticated} = require('../config/auth')



//create connection to mongoose for multi
var conn = mongoose.createConnection(process.env.DB_CONNECT)

conn.once('open',()=> {
  var gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection(UserModel);

})
//create storage engine
var storage = new GridFsStorage({
  url: process.env.DB_CONNECT,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: UserModel
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });



/* GET home page. */
router.get('/',  index.show_home);

/* GET Signup page. */
router.get('/signup',auth.show_signup);

router.post('/signup', auth.signup)

/* GET login page. */
router.get('/login',auth.show_login);

router.post('/login',auth.login);


router.get('/logout',auth.logout);




router.get('/browsejobs', index.show_browseJobs)

router.get('/browsejobs/category',index.show_browseJobsByCategory)
module.exports = router;

router.get('/category/categoryname/alljobs',index.show_categoryJobs)