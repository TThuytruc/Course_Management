class AdminController {
    course(req,res, next) {
        res.render('admin/course');
    }
    home(req,res, next) {
        res.render('admin/home');
    }
}

module.exports = new AdminController;