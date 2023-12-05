class AdminController {
    course(req,res) {
        res.render('admin/course');
    }
    home(req,res) {
        // console.log('req.query', req.query);
        res.render('admin/home');
    }
}

module.exports = new AdminController;