var User = require('../models/Users')
const VALIDATION = require('../validation/validate');


exports.show_login=(req,res,next) =>{
    res.render('login',{ title: 'JobHunts' });

}
exports.show_signup=(req,res,next) =>{
    res.render('signup',{ title: 'JobHunts',error:{} });

}
//first name ,last name, career level, education level ,email ,zipcode ,upload resume
exports.signup= (req,res,next)=>{
    const{error}= VALIDATION.signupValidation(req.body)
    if(error) return res.render('signup',{ title: 'JobHunts',error:error.details[0].message },);


    const user = new User({
firstName: req.body.firstName,
lastName: req.body.lastName,
password: req.body.password,
careerLevel: req.body.careerLevel,
educationLevel: req.body.educationLevel,
email: req.body.email,
zipCode: req.body.zipCode
 });
 user.save()
 .then(result=>{
     res.redirect('/login');
     console.log(result);
 })
 .catch(err =>console.log(err));
}