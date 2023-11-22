class ListStundentController {
    index(req,res, next) {
        res.render('list_student/list_student');
    }

}

module.exports = new ListStundentController;