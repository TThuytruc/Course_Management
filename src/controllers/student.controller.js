const db=require('../database/db');
const Student=require('../models/students.m');
const Account=require('../models/account.m');
const Admin= require('../models/admin.m');
const Course_Student=require('../models/course_student.m');
const Course_Teacher=require('../models/course_teacher.m');
const Course=require('../models/course.m');
const Exercise=require('../models/exercise.m');
const Submission=require('../models/submission.m');
const Teacher=require('../models/teacher.m');
const Topic=require('../models/topic.m');
const User=require('../models/users.m');

class StudentController {
    course(req,res) {
        res.render('student/course');
    }
    async home(req,res) {

        // test query database
        // await Account.getAll();
        // await Account.getCondition('abc','123');
        // const dataInsert=new Account({email:'quantranhuynh@gmail.com',password:'123'})
        // await Account.insert(dataInsert);

        console.log("test");

        res.render('student/home');
    }
    submission(req,res) {
        res.render('student/submission');
    }
}

module.exports = new StudentController;