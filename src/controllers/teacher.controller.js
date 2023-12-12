const db=require('../database/db');
const User = require('../models/users.m');
const Course_Teacher = require('../models/course_teacher.m');
const Course = require('../models/course.m');

class TeacherController {
    async home(req,res) {
        const userid = req.query.user_id;
        const user = await User.getCondition('user_id', userid);

        const userAccount = await User.getAccount(userid);
        const userEmail = userAccount[0].account_email;
     
        const course_teacher = await Course_Teacher.getCondition('user_id', userid);
        let courses = [];
        for (let i = 0; i < course_teacher.length; i++) 
        {
            const course = await Course.getCondition('course_id', course_teacher[i].course_id);
            courses.push(course[0]);
        }
     
        const dataRender={user: user[0], arrayCourse: courses, userEmail: userEmail};
        res.render('teacher/home', dataRender);
    }

    async course(req,res) {
        res.render('teacher/course');
    }

    async submission(req,res) {
        res.render('teacher/submission');
    }
}

module.exports = new TeacherController();