var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Users = require('./models/Users');
var flash = require('connect-flash');
const ROLES =require('./utils/roles')



module.exports = (passport)=>{
    passport.use(
        new LocalStrategy({
            usernameField:'email'
        },(email,password,done)=>{
//Match User
Users.findOne({email:email})
.then(user=>{
    if(!user){
        return done(null,false ,{message:'Email is not registered'});
    }
    //match password
    bcrypt.compare(password,user.password,(err, isMatch)=>{
if(err) throw err;
if(isMatch){
    return done(null,user);
}else{
    return done(null,false,{message:'InCorrect Password'})
}
  })
  const hasRole = ROLES.Customer;
  if(user.role != hasRole){
      return done(null,false,{message:'UnAuthorized Role'});
  }
 
})
.catch(err=>console.log(err));
        })
    )
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        Users.findById(id,(err, user)=> {
          done(err, user);
        });
      });
}

