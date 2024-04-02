const Course_student = require('../models/course_student.m');
const Course_teacher = require('../models/course_teacher.m')
const User = require('../models/users.m')
const Course = require('../models/course.m');
const db = require('../database/db')
class ListStudentController {
    async index(req, res, next) {
        const id_course = req.query.course_id;
        const id_user = req.session.user_id;
        const user = await User.getCondition('user_id',id_user);
        const dataUserAccount = await db.getAllInforUser();
        const listIDStudent = await Course_student.getCondition('course_id', id_course);
        const dataReturn = dataUserAccount.filter(objA => listIDStudent.some(objB => objB.user_id === objA.user_id));
        let count = 0;
        for (const item of dataReturn) {
            for(const student of listIDStudent)
            {
                if(item.user_id===student.user_id)
                {
                    item['finalscore'] = student.finalscore;
                }
            }
        }
   
        count = 0;
        let dataCourse = await Course.getCondition('course_id', id_course);
        dataCourse = dataCourse[0];
        const listIDTeacher = await Course_teacher.getCondition('course_id', id_course);
        const inforTeacher = dataUserAccount.filter(objA => listIDTeacher.some(objB => objB.user_id === objA.user_id));
        const listTeacher = [];
        for (const teacher of inforTeacher) {
            const obj = { user_name: teacher.user_name };
            listTeacher.push(obj);
        }
        let student = await db.countItem('course_student', 'course_id', id_course);
        student = student[0].count;
        let teacher = await db.countItem('course_teacher', 'course_id', id_course);
        teacher = teacher[0].count;
        
        const listStudent = {
            user:user[0],
            array: dataReturn,
            course_id: dataCourse.course_id,
            course_name: dataCourse.course_name,
            numberofteacher:teacher,
            numberofstudent:student,
            schedule: dataCourse.schedule,
            teachers: listTeacher
        };
        if(user[0].user_role == 'student'){
            res.render('list_student/list_student_studentview', listStudent);
        } else res.render('list_student/list_student_teacherview', listStudent);
       
    };
    async updateFinalScore(req,res,next){
        const course_id = req.body.data.course_id;
        const user_id = req.body.data.user_id;
        const score = req.body.data.score;
        await db.UpdateFinalScore(course_id,user_id,score);
        res.json({message: 'ok'});
    }
}
module.exports = new ListStudentController();