class ListStudentController {
    index(req,res) {
        res.render('list_student/list_student');
    }

}

module.exports = new ListStudentController;