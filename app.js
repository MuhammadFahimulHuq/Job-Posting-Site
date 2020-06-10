var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash')
var session= require('express-session') 
var passport =  require('passport')
var express_layout = require('express-ejs-layouts')


require('./passport_setup')(passport)
//Server 
var mongoose =require('mongoose');
var dotenv = require('dotenv');
dotenv.config();


//routes
var indexRouter = require('./routes/index');
var employeersRouter= require('./routes/employeers');
var securedRouter = require('./routes/secured/securedRoute')

var methodOverride = require('method-override');


var app = express();


// view engine setup
app.use(express_layout);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
res.locals.LoggedIn = req.flash('LoggedIn');
  next();
})


app.use('/', indexRouter);
app.use('/employeers', employeersRouter);
app.use('/secured',securedRouter);


app.use((res,req,next)=>{
  res.locals.succes_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
})


//connetion to mongoose
mongoose.connect(process.env.DB_CONNECT,{ useUnifiedTopology: true },()=>{ console.log('server connected')});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
