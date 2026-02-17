exports.isuser = (req, res, next) => {
    if (!req.session.User) {
        return res.redirect('/login');
    }
   
    next();
}
exports.isadmin = (req, res, next) => {
   if (!req.session.Admine) {
        return res.redirect('/login');
    }
   
    next();
}
