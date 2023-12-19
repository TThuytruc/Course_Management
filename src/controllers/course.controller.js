const Course = require('../models/course.m');

class CourseController {
    async insert(req, res, next){ 
        try {
            const course = req.body;
            course.maxnumberofstudent = course.maxnumberofstudent === '' ? 0 : course.maxnumberofstudent;
            const data = await Course.insert(course);
            res.redirect('back');
        }
        catch(e){
            next(e);
        }
    }
    async delete(req, res, next){ 
        try {
            const course_id = req.params.id;
            console.log(course_id); 
            await Course.delete(course_id);
            res.redirect('back')
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = new CourseController