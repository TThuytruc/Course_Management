class StudentController {
    course(req,res) {
        res.render('student/course');
    }
    home(req,res) {
        res.render('student/home');
    }
    submission(req,res) {
        res.render('student/submission');
    }
}

module.exports = new StudentController;