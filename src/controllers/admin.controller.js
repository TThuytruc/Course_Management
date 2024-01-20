const Course = require('../models/course.m');
const Course_Student = require('../models/course_student.m');
const Course_Teacher = require('../models/course_teacher.m');
const Student = require('../models/students.m');
const Teacher = require('../models/teacher.m');
const db = require('../database/db')
const xlsx = require('xlsx');
const fs = require('fs');
const multer = require('multer');

// // Cấu hình multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       // Định nghĩa thư mục lưu trữ cho tệp tin tải lên
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       // Định nghĩa tên tệp tin khi lưu trữ
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   });

//   const upload = multer({
//     storage: storage
//   });

class AdminController {
    async course(req, res, next) {
        const id_course = req.query.course_id;
        const listTeacher = await Course_Teacher.getCondition('course_id', id_course);
        const listStudent = await Course_Student.getCondition('course_id', id_course);
        const dataUserAccount = await db.getAllInforUser();
        let course = await Course.getCondition('course_id', id_course);
        course = course[0];

        const listInforTeacher = dataUserAccount.filter(objA => listTeacher.some(objB => objB.user_id === objA.user_id));
        const listInforStudent = dataUserAccount.filter(objA => listStudent.some(objB => objB.user_id === objA.user_id));
        const dataRender = { teachers: listInforTeacher, students: listInforStudent, namecourse: course.course_name, username: 'Admin', id_course: id_course, numberofstudent:listStudent.length, numberofteacher:listTeacher.length };
        res.render('admin/course', dataRender);
    }
    async home(req, res, next) {
        const data = await Course.getAll();
        for (const item of data) {
            let student = await db.countItem('course_student', 'course_id', item.course_id);
            // console.log(student);
            student = student[0].count;
            let teacher = await db.countItem('course_teacher', 'course_id', item.course_id);
            teacher = teacher[0].count;
            item['numberofstudent'] = student;
            item['numberofteacher'] = teacher;
        }
        const result = { arrayCourse: data, username: 'Admin' };
        res.render('admin/home', result);
    }
    async DeleteAllTeacher(req, res, next) {
        const courseId = req.body.id_course;
        await db.deleteAllInforInCourse(courseId, 'course_teacher');
        res.send('ok');
    }
    async DeleteAllStudent(req, res, next) {
        const courseId = req.body.id_course;
        await db.deleteAllInforInCourse(courseId, 'course_student');
        res.send('ok');
    }
    async DeleteUserInCourse(req, res, next) {
        const courseId = req.body.course_id;
        const userId = req.body.user_id;
        await db.DeleteUser(courseId, userId);
        res.json({ message: 'ok' });
    }
    async AddTeacherToCourse(req, res, next) {
        const courseId = req.body.course_id;
        const userId = req.body.user_id;
        await Teacher.add_teacher_to_course(courseId, userId);
        res.json({ message: 'ok' });
    }
    async AddStudentToCourse(req, res, next) {
        const courseId = req.body.course_id;
        const userId = req.body.user_id;
        await Student.add_student_to_course(courseId, userId);
        res.json({ message: 'ok' });
    }
    async importExcelFile(req, res) {
        const receivedArray = req.body.data;
        // console.log(receivedArray.id);

        const list_Student = await Course_Student.getCondition('course_id', receivedArray.id);
        // console.log(list_Student);
        const current_number_student = list_Student.length > 0 ? list_Student.length : 0;
        let total_student = await Course.getCondition('course_id', receivedArray.id);
        total_student = total_student[0].maxnumberofstudent;
        // console.log(current_number_student + receivedArray.students.length > total_student);
        if (current_number_student + receivedArray.students.length > total_student) {
            // console.log("So luong vuot qua gioi han");
            res.status(500).json({ message: "The number of students in file exceeded the limit!" });
            return;
        }
        else {
        }

        try {
            for (const student of receivedArray.students) {
                // console.log(student[0]);
                const user = await Student.getCondition('user_id', student[0]);
                if (user.length > 0) {
                    const checkInsert = await db.getTwoCondition('course_student', 'course_id', 'user_id', receivedArray.id, student[0]);
                    if (checkInsert.length == 0) {
                        const dataInsert = new Course_Student({ course_id: receivedArray.id, user_id: student[0], FinalScore: null })
                        await Course_Student.insert(dataInsert);
                    }

                }

            }
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    async importExcelFileTeacher(req, res) {
        const receivedArray = req.body.data;
        // console.log(receivedArray.id);
        try {
            for (const student of receivedArray.students) {
                // console.log(student[0]);
                const user = await Teacher.getCondition('user_id', student[0]);
                if (user.length > 0) {
                    const checkInsert = await db.getTwoCondition('course_teacher', 'course_id', 'user_id', receivedArray.id, student[0]);
                    if (checkInsert.length == 0) {
                        const dataInsert = new Course_Teacher({ course_id: receivedArray.id, user_id: student[0] })
                        await Course_Teacher.insert(dataInsert);
                    }
                }

            }
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ message: false, error: error.message });
        }
    }
}

module.exports = new AdminController;
