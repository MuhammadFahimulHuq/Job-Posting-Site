

exports.show_home = (req, res, next) => {
    res.render('home', { title: 'JobHunts'})
};



exports.show_browseJobs=(req,res,next)=>{
    res.render('browsejobs');
}
exports.show_browseJobsByCategory=(req,res,next)=>{
    res.render('browseBycategory')
}
exports.show_categoryJobs=(req,res,next)=>{
    res.render('categoryJobs')
}