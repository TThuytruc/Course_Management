const db=require('../database/db');
const User = require('../models/users.m');
const Course_Student = require('../models/course_student.m');
const Course = require('../models/course.m');
const Exercise = require('../models/exercise.m');
const moment = require('moment');

class StudentController {
    async home(req,res) {
        console.log('req.session.user_id', req.session.user_id);
        const userid = req.session.user_id;
        // const userid = req.query.user_id;
        // res.json(req.session);
        const user = await User.getCondition('user_id', userid);

        const userAccount = await User.getAccount(userid);
        const userEmail = userAccount[0].account_email;
     
        const course_student = await Course_Student.getCondition('user_id', userid);
        let courses = [];
        for (let i = 0; i < course_student.length; i++) 
        {
            const course = await Course.getCondition('course_id', course_student[i].course_id);
            courses.push(course[0]);
        }
     
        let exercises = [];
        for (let i = 0; i < courses.length; i++) 
        {
            const exerciseInOneCourse = await Exercise.getUpcommingEvents(courses[i].course_id);
            for(let j = 0; j < exerciseInOneCourse.length; j++)
            {
                exerciseInOneCourse[j].duetime = moment(exerciseInOneCourse[j].duetime).format('HH:mm - DD/MM/YYYY');
                exercises.push(exerciseInOneCourse[j]);
            }
        }

        const dataRender={user: user[0], arrayCourse: courses, userEmail: userEmail, exercises: exercises};
        res.render('student/home', dataRender);
    }

    async course(req,res) {
        res.render('student/course');
    }
    
    async submission(req,res) {
        res.render('student/submission');
    }
}

module.exports = new StudentController();
