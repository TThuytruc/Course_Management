class AdminController {
    course(req,res, next) {
        res.render('admin/course');
    }
    home(req,res, next) {
        console.log('req.query', req.query);
        res.render('admin/home');
    }
}

module.exports = new AdminController;