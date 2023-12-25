const db = require('../database/db');
const multer = require('multer');
const path = require('path');
const User = require('../models/users.m');
const Course_Student = require('../models/course_student.m');
const Course = require('../models/course.m');
const Exercise = require('../models/exercise.m');
const moment = require('moment');
const Course_Teacher = require('../models/course_teacher.m');
const Topic = require('../models/topic.m');
const fs = require('fs');
const Submission = require('../models/submission.m');

// Thiết lập multer để lưu trữ file trong thư mục "Submission"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(req.body);
        // var sanitizedString = inputString.replace(/[\/\\:*?"<>|]/g, '');
        const course_id=req.body.course_id;
        const exercise_id=req.body.exercise_id;
        let course_name = req.body.course_name;
        course_name = course_name.replace(/\s+/g, '_');
        course_name = course_name.replace(/[\/\\:*?"<>|]/g, '');
        course_name=course_name+ `-${course_id}`;


        let exercise_name = req.body.exercise_name;
        exercise_name = exercise_name.replace(/\s+/g, '_');
        exercise_name = exercise_name.replace(/[\/\\:*?"<>|]/g, '');
        exercise_name=exercise_name+`-${exercise_id}`

        const linkFileSubmission =path.join(__dirname, `../Submission/${course_name}/${exercise_name}`) ;
        // console.log(linkFileSubmission);
        fs.mkdirSync(linkFileSubmission, { recursive: true });
        cb(null, linkFileSubmission);
    },
    filename: async function (req, file, cb) {
        const user_id = req.body.user_id;
        const SubmissionTime = req.body.date;
        const exercise_id = req.body.exercise_id;
        const Score = 0;

        const stringWithUnderscore = file.originalname.replace(/\s+/g, '-');
        const submissionfile = stringWithUnderscore;

        console.log('Uploaded file name:', submissionfile);

        const data = new Submission({ user_id, exercise_id, SubmissionTime, submissionfile, Score });
        const insert = await Submission.insert(data);

        console.log(user_id);
        cb(null, submissionfile);
    },
});

const upload = multer({ storage: storage });

class StudentController {
    async home(req, res) {
        // console.log('req.session.user_id', req.session.user_id);
        const userid = req.session.user_id;
        // const userid = req.query.user_id;
        // res.json(req.session);
        const user = await User.getCondition('user_id', userid);

        const userAccount = await User.getAccount(userid);
        const userEmail = userAccount[0].account_email;

        const course_student = await Course_Student.getCondition('user_id', userid);
        let courses = [];
        for (let i = 0; i < course_student.length; i++) {
            const course = await Course.getCondition('course_id', course_student[i].course_id);
            courses.push(course[0]);
        }

        let exercises = [];
        for (let i = 0; i < courses.length; i++) {
            const exerciseInOneCourse = await Exercise.getUpcommingEvents(courses[i].course_id);
            for (let j = 0; j < exerciseInOneCourse.length; j++) {
                exerciseInOneCourse[j].duetime = moment(exerciseInOneCourse[j].duetime).format('HH:mm - DD/MM/YYYY');
                exercises.push(exerciseInOneCourse[j]);
            }
        }

        const dataRender = { user: user[0], arrayCourse: courses, userEmail: userEmail, exercises: exercises };
        res.render('student/home', dataRender);
    }

    async course(req, res) {
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
            //console.log(topic);
        });

        let finalscore = await db.getFinalScore(id_course, userid);
        finalscore = finalscore[0].finalscore;


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
            numberofteacher: teacher,
            numberofstudent: student,
            finalscore: finalscore

        };
        res.render('student/course', dataRender);
    }

    async submission(req, res) {
        const userid = req.session.user_id;
        const exerciseid = req.query.exercise_id;

        const user = await User.getCondition('user_id', userid);
        const exercise = await Exercise.getCondition('exercise_id', exerciseid);
        const topic = await Topic.getCondition('topic_id', exercise[0].topic_id);
        const courseid = topic[0].course_id;

        const course = await Course.getCondition('course_id', courseid);
        const course_teacherid = await Course_Teacher.getCondition('course_id', courseid)
        const course_studentid = await Course_Student.getCondition('course_id', courseid)

        //add by quan
        const fileSubmission= await db.getTwoCondition('submission','user_id','exercise_id',userid,exerciseid)
        console.log(fileSubmission);
        let nameFileSubmit='No files selected';
        let isSubmit=false;
        if(fileSubmission.length>0)
        {
            nameFileSubmit= fileSubmission[0].submissionfile;
            isSubmit=true;
        }
        else
        {
            nameFileSubmit= 'No files selected';
            isSubmit=false;
        }
        // finish add.


        const numberofStudent = course_studentid.length
        const numberofTeacher = course_teacherid.length
        let teachers = []

        for (let i = 0; i < course_teacherid.length; i++) {
            const teacher = await User.getCondition('user_id', course_teacherid[i].user_id);
            teachers.push(teacher[0]);
        }
       
        const submission = await Submission.getCondition('user_id', course_studentid[0].user_id);
        
        function getTimeRemaining(start, end) {
            const duration = moment.duration(moment(end).diff(moment(start)));
            const days = Math.floor(duration.asDays());
            const hours = duration.hours();
            const minutes = duration.minutes();
            return `${days} days ${hours} hours ${minutes} minutes`;
        }
        let sub_status, sub_grading, time_remaining, sub_modified;
        if (submission.length <= 0) {
            sub_status = `No attempt`;
            if (moment().isBefore(exercise[0].duetime)) {
                time_remaining = getTimeRemaining(moment(), exercise[0].duetime);
            } else {
                time_remaining = `Assignment is overdue by: ` + getTimeRemaining(exercise[0].duetime, moment());
            }
            sub_grading = `Not graded`;
            sub_modified = `-`;
        } else {
            sub_status = `Submitted for grading`;
            sub_modified = moment(submission[0].submissiontime).format('HH:mm - DD/MM/YYYY');
            if (submission[0].score == null) {
                sub_grading = `Not graded`;
            } else {
                sub_grading = `Graded`;
            }
            if (moment(submission[0].submissiontime).isBefore(exercise[0].duetime)) {
                time_remaining = `Assignment was submitted early for: ` + getTimeRemaining(submission[0].submissiontime, exercise[0].duetime);
            } else {

                time_remaining = `Assignment is overdue by: ` + getTimeRemaining(exercise[0].duetime, moment());
            }
            
        }

        exercise[0].opentime = moment(exercise[0].opentime).format('dddd, D MMMM YYYY, HH:mm');
        exercise[0].duetime = moment(exercise[0].duetime).format('dddd, D MMMM YYYY, HH:mm');

        let events = [];
        for (let i = 0; i < course.length; i++) {
            const exerciseInOneCourse = await Exercise.getUpcommingEvents(course[i].course_id);
            for (let j = 0; j < exerciseInOneCourse.length; j++) {
                exerciseInOneCourse[j].duetime = moment(exerciseInOneCourse[j].duetime).format('HH:mm - DD/MM/YYYY');
                events.push(exerciseInOneCourse[j]);
            }
        }
        const dataRender = {
            user: user[0],
            courseInfo: course[0],
            exercise: exercise[0],
            submission: submission[0],
            teachers: teachers,
            numberofTeacher: numberofTeacher,
            events: events,
            numberofStudent: numberofStudent,
            time_remaining: time_remaining,
            sub_grading: sub_grading,
            sub_status: sub_status,
            sub_modified: sub_modified,
            //add by quan
            nameFileSubmit:nameFileSubmit,
            isSubmit:isSubmit
            // finish
        };
        res.render('student/submission', dataRender);
    }

    upload(req, res) {
        upload.array('files')(req, res, function (err) {

            if (err) {
                // Xử lý lỗi khi upload file
                console.error(err);
                return res.status(500).json({ error: 'Error uploading files.' });
            }
            // Tiếp tục xử lý sau khi upload thành công
            res.json({ message: 'Files uploaded successfully.' });
        });
    }
    async removeFile(req,res)
    {
        const user_id=req.body.user_id;
        const exercise_id=req.body.exercise_id;
        const nameFileSubmit=req.body.nameFileSubmit;
        const course_id=req.body.course_id;
        console.log(nameFileSubmit);
        const data= await db.deleteTwoCOndition('submission','user_id','exercise_id',user_id,exercise_id);

        let course_name = req.body.course_name;
        course_name = course_name.replace(/\s+/g, '_');
        course_name = course_name.replace(/[\/\\:*?"<>|]/g, '');
        course_name=course_name+ `-${course_id}`;


        let exercise_name = req.body.exercise_name;
        exercise_name = exercise_name.replace(/\s+/g, '_');
        exercise_name = exercise_name.replace(/[\/\\:*?"<>|]/g, '');
        exercise_name=exercise_name+`-${exercise_id}`


        const linkFileSubmission =path.join(__dirname, `../Submission/${course_name}/${exercise_name}/${nameFileSubmit}`) ;
        fs.unlink(linkFileSubmission, (err) => {
            if (err) {
              console.error('Lỗi khi xóa tệp tin:', err);
              res.json({ message: 'Files remove error.' });
              return;
            }
            console.log('Tệp tin đã được xóa thành công.');
            res.json({ message: 'Files remove successfully.' });
          });
       
    }
}

module.exports = new StudentController();
