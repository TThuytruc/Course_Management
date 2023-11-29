
class TeacherController {
    course(req,res) {
        res.render('teacher/course');
    }
    home(req,res) {
        res.render('teacher/home');
    }
    submission(req,res) {
        res.render('teacher/submission');
    }
}

module.exports = new TeacherController;