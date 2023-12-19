const db = require('../database/db');
const User = require('../models/users.m');
const Course_Teacher = require('../models/course_teacher.m');
const Course_Student = require('../models/course_student.m');
const Course = require('../models/course.m');
const Topic = require('../models/topic.m');
const Exercise = require('../models/exercise.m');

class TeacherController {
    async home(req, res) {
        const userid = req.session.user_id;
        const user = await User.getCondition('user_id', userid);

        const userAccount = await User.getAccount(userid);
        const userEmail = userAccount[0].account_email;

        const course_teacher = await Course_Teacher.getCondition('user_id', userid);
        let courses = [];
        for (let i = 0; i < course_teacher.length; i++) {
            const course = await Course.getCondition('course_id', course_teacher[i].course_id);
            courses.push(course[0]);
        }

        const dataRender = { user: user[0], arrayCourse: courses, userEmail: userEmail };
        res.render('teacher/home', dataRender);
    }


    async course(req, res, next) {
        const userid = req.session.user_id;
        const user = await User.getCondition('user_id', userid);
        const id_course = req.query.course_id;
        const dataUserAccount = await db.getAllInforUser();

        let dataCourse = await Course.getCondition('course_id', id_course);
        dataCourse = dataCourse[0];

        let dataTopic = await Topic.getCondition('course_id', id_course);
        dataTopic.forEach(async (topic) => {
            const data = await Exercise.getCondition('topic_id', topic.topic_id);
            topic['exercise'] = data;
            console.log(topic);
        });


        const listIDTeacher = await Course_Teacher.getCondition('course_id', id_course);
        const inforTeacher = dataUserAccount.filter(objA => listIDTeacher.some(objB => objB.user_id === objA.user_id));
        const listTeacher = [];
        for (const teacher of inforTeacher) {
            const obj = { user_name: teacher.user_name };
            listTeacher.push(obj);
        }

        let student = await db.countItem('course_Student', 'course_id', id_course);
        console.log(student);
        student = student[0].count;
        let teacher = await db.countItem('course_Teacher', 'course_id', id_course);
        teacher = teacher[0].count;

        const dataRender = {
            user: user[0],
            course_name: dataCourse.course_name,
            course_id: dataCourse.course_id,
            dataTopic: dataTopic,
            teacher: listTeacher,
            numberofteacher:teacher,
            numberofstudent:student

        };
        res.render('teacher/course', dataRender);
    }

    async submission(req, res) {
        res.render('teacher/submission');
    }
}

module.exports = new TeacherController();
