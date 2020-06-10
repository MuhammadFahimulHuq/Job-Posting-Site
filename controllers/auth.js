var User = require('../models/Users')
var Role =require('../models/Role')
const VALIDATION = require('../validation/validate');
var bcrypt = require('bcrypt');
var passport = require('passport');
var myPassport = require('../passport_setup')(passport);
const ROLES = require('../utils/roles')


exports.show_login=(req,res,next) =>{
    res.render('login',{ title: 'JobHunts',errors:'' });

}
exports.show_signup=(req,res,next) =>{
    res.render('signup',{ title: 'JobHunts',errors:'' });

}
const generateHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null)
}


//first name ,last name, career level, education level ,email ,zipcode ,upload resume
exports.signup=  (req,res,next)=>{
        const {error} = VALIDATION.signupValidation(req.body)
       if(error) return res.render('signup',{title:'JobHunts',errors:error.details[0]})

       User.findOne({email:req.body.email}).then(emailExist=>{
        if(emailExist) {
           req.flash('error_msg','Email already Exist')
           return res.redirect('/signup')
        }
        else{
         const user = new User({
             firstName: req.body.firstName,
             lastName: req.body.lastName,
             password: generateHash(req.body.password) ,
             careerLevel: req.body.careerLevel,
             educationLevel: req.body.educationLevel,
             email: req.body.email,
             zipCode: req.body.zipCode,
            role: ROLES.Employeer
                })
           
              
              return  user.save().then(result=>{
                  result.save()
                  console.log(result);
               req.flash('success_msg','You registered please Login');
res.redirect('/login');
   }).catch(err=> console.log(err));
       
}})}
      


 exports.login=(req,res,next)=>{
     const {error} = VALIDATION.loginValidation(req.body);
    if(error)return res.render('login',{title:'JobHunts',error:error.details[0]})
    
passport.authenticate('local',{
    successRedirect:"/secured/home",
    failureRedirect:"/login",
    failureFlash:true
    })(req,res,next);
 

 }

exports.logout = (res,req,next) =>{
delete req.session;
req.redirect('/');
}
