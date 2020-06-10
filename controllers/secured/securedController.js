

exports.show_home=(req,res,next)=>{
   res.render('secured/home',{LoggedIn: req.user.firstName+' ' + req.user.lastName})
}