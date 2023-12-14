const Course_student = require('../models/course_student.m');
const Course_teacher = require('../models/course_teacher.m')
const Course = require('../models/course.m');
const db = require('../database/db')
class ListStundentController {
    async index(req, res, next) {
        const id_course = req.query.course_id;
        const dataUserAccount = await db.getAllInforUser();
        const listIDStudent = await Course_student.getCondition('course_id', id_course);
        const dataReturn = dataUserAccount.filter(objA => listIDStudent.some(objB => objB.user_id === objA.user_id));
        let count = 0;
        for (const item of dataReturn) {
            item['finalscore'] = listIDStudent[count].finalscore;
            ++count;
        }
        // console.log(dataReturn);
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
        console.log(student);
        student = student[0].count;
        let teacher = await db.countItem('course_teacher', 'course_id', id_course);
        teacher = teacher[0].count;
        
        const listStudent = {
            array: dataReturn,
            course_id: dataCourse.course_id,
            course_name: dataCourse.course_name,
            numberofteacher:teacher,
            numberofstudent:student,
            schedule: dataCourse.schedule,
            teachers: listTeacher,
            username:'Admin'
        };
        res.render('list_student/list_student', listStudent);
    };
}

module.exports = new ListStundentController();
