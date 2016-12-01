module.exports = function(req,res,next) {
    if (!req.session.username) {
        return res.redirect('member/login');
    }
    return next();
}