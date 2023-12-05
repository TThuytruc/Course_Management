const Course = require('../models/course.m');
const Course_Student = require('../models/course_student.m');
const Course_Teacher = require('../models/course_teacher.m');
const db = require('../database/db')
class AdminController {
    async course(req, res, next) {
        const id_course = req.query.id_course;
        const listTeacher = await Course_Teacher.getCondition('course_id', id_course);
        const listStudent = await Course_Student.getCondition('course_id', id_course);
        const dataUserAccount= await db.getAllInforUser();
        let course= await Course.getCondition('course_id',id_course);
        course=course[0];



        const listInforTeacher = dataUserAccount.filter(objA => listTeacher.some(objB => objB.user_id === objA.user_id));
        const listInforStudent=dataUserAccount.filter(objA => listStudent.some(objB => objB.user_id === objA.user_id));
        const dataRender={teachers:listInforTeacher,students:listInforStudent,namecourse:course.course_name};
        res.render('admin/course',dataRender);
    }
    async home(req, res, next) {
        const data = await Course.getAll();
        for(const item of data)
        {
            let student= await db.countItem('course_student','course_id',item.course_id);
            console.log(student);
            student=student[0].count;
            let teacher= await db.countItem('course_teacher','course_id',item.course_id);
            teacher=teacher[0].count;
            item['numberofstudent']=student;
            item['numberofteacher']=teacher;
        }
        const result = { arrayCourse: data };
        res.render('admin/home', result);
    }
}

module.exports = new AdminController;