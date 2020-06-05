

exports.show_home = (req, res, next) => {
    res.render('home', { title: 'JobHunts' })};

exports.show_login=(req,res,next) =>{
    res.render('login',{ title: 'JobHunts' });

}
exports.show_signup=(req,res,next) =>{
    res.render('signup',{ title: 'JobHunts' });

}