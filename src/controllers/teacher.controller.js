const db = require('../database/db');
const User = require('../models/users.m');
const Course_Teacher = require('../models/course_teacher.m');
const Course_Student = require('../models/course_student.m');
const Course = require('../models/course.m');
const Topic = require('../models/topic.m');
const Exercise = require('../models/exercise.m');
const Submission = require('../models/submission.m');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const moment = require('moment');

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
        });


        const listIDTeacher = await Course_Teacher.getCondition('course_id', id_course);
        const inforTeacher = dataUserAccount.filter(objA => listIDTeacher.some(objB => objB.user_id === objA.user_id));
        const listTeacher = [];
        for (const teacher of inforTeacher) {
            const obj = { user_name: teacher.user_name };
            listTeacher.push(obj);
        }

        let student = await db.countItem('course_Student', 'course_id', id_course);
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
            numberofstudent: student

        };
        res.render('teacher/course', dataRender);
    }

    async submission(req, res) {
        const userid = req.session.user_id;
        const exerciseid = req.query.exercise_id;

        const user = await User.getCondition('user_id', userid);

        const exercise = await Exercise.getCondition('exercise_id', exerciseid);
        exercise[0].opentime = moment(exercise[0].opentime).format('dddd, D MMMM YYYY, HH:mm');
        exercise[0].duetime = moment(exercise[0].duetime).format('dddd, D MMMM YYYY, HH:mm');

        const topic = await Topic.getCondition('topic_id', exercise[0].topic_id);
        const courseid = topic[0].course_id;

        const course = await Course.getCondition('course_id', courseid);
        const course_teacherid = await Course_Teacher.getCondition('course_id', courseid)
        const course_studentid = await Course_Student.getCondition('course_id', courseid)

        const numberofStudent = course_studentid.length
        const numberofTeacher = course_teacherid.length
        let teachers = []

        for (let i = 0; i < course_teacherid.length; i++) {
            const teacher = await User.getCondition('user_id', course_teacherid[i].user_id);
            teachers.push(teacher[0]);
        }

        const exercise_sub = await Submission.getCondition('exercise_id', exerciseid);

        let submissions = [];
        let student_submissions = [];
        for (let j = 0; j < exercise_sub.length; j++) {
            const submission = await Submission.getCondition('exercise_id', exercise_sub[j].exercise_id);
            submission[j].submissiontime = moment(submission[j].submissiontime).format('DD/MM/YYYY - HH:mm');
            const student = await User.getCondition('user_id', exercise_sub[j].user_id);
            student_submissions.push(student[0]);
            submissions.push(submission[j]);
        }
        const totalSubmissions = exercise_sub.length;
        const mergedArray = [];

        submissions.forEach(item1 => {
            const matchingItem = student_submissions.find(item2 => item2.user_id === item1.user_id);
            if (matchingItem) {
                const mergedItem = { ...item1, ...matchingItem };
                mergedArray.push(mergedItem);
            }
        });

        submissions.sort((a, b) => a.user_id - b.user_id);
        let totalGraded = 0;
        for (let j = 0; j < submissions.length; j++) {
            if (submissions[j].score !== null)
                totalGraded++;
        }

        mergedArray.sort((a,b) => a.user_id - b.user_id)
        var checkDownload= mergedArray.length>0;
        const dataRender = {
            user: user[0],
            courseInfo: course[0],
            exercise: exercise[0],
            submissionArray: submissions,
            teachers: teachers,
            numberofTeacher: numberofTeacher,
            students: student_submissions,
            numberofStudent: numberofStudent,
            submissions: mergedArray,
            totalSubmissions: totalSubmissions,
            totalGraded: totalGraded,
            exerciseid,
            checkDownload:checkDownload,
        };
        res.render('teacher/submission', dataRender);
    }

    async downloadAll(req, res) {
        const user_id = req.body.user_id;
        const exercise_id = req.body.exercise_id;
        const course_id=req.body.course_id;
        let course_name = req.body.course_name;
        course_name = course_name.replace(/\s+/g, '_');
        course_name = course_name.replace(/[\/\\:*?"<>|]/g, '');
        course_name=course_name+ `-${course_id}`;


        let exercise_name = req.body.exercise_name;
        exercise_name = exercise_name.replace(/\s+/g, '_');
        exercise_name = exercise_name.replace(/[\/\\:*?"<>|]/g, '');
        exercise_name=exercise_name+`-${exercise_id}`

        const submissionFolder = path.join(__dirname, `../Submission/${course_name}/${exercise_name}`);
        try {
            const data = await Submission.getCondition('exercise_id', exercise_id);
            const listFileName = data.map(file => file.submissionfile);
            console.log(listFileName);
            const zipFilePath = path.join(__dirname, `../${exercise_name}.zip`);
            const archive = archiver('zip', { zlib: { level: 9 } });
            
            if (!fs.existsSync(zipFilePath)) {
                // Nếu file không tồn tại, tạo file mới
                fs.writeFileSync(zipFilePath, `/${exercise_name}.zip`);
            }
            archive.pipe(res);

            // Thêm từng file cụ thể vào tệp ZIP
            listFileName.forEach(fileName => {
                const filePath = path.join(submissionFolder, fileName);
                if (fs.existsSync(filePath)) {
                    archive.file(filePath, { name: fileName });
                }
            });

            // Sự kiện 'end' sẽ được gọi khi quá trình nén hoàn tất
            archive.on('end', () => {
                // Gửi file ZIP về client sau khi đã nén
                res.sendFile(zipFilePath, { root: __dirname }, (downloadError) => {
                    if (downloadError) {
                        console.error('Error during download:', downloadError);
                    }
                });
                // Xóa file ZIP sau khi đã gửi về client
                fs.unlinkSync(zipFilePath);

            });

            // Sự kiện 'error' để theo dõi lỗi trong quá trình nén
            archive.on('error', (error) => {
                console.error('Error during archiving:', error);
                res.status(500).json({ error: 'Internal server error.' });
            });

            await new Promise((resolve, reject) => {
                archive.finalize();
                archive.on('end', resolve);
                archive.on('error', reject);
            });

        } catch (error) {
            console.error('Error during downloadAll:', error);
            res.status(500).json({ error: 'Internal server error.' });
        }

    }

    async submissionImportScore(req, res) {
        try {
            const submissions = req.body;
            for (const submission of submissions) {
                const user_id = submission.user_id;
                const exercise_id = submission.exercise_id;
                const score = submission.score;
                await Submission.update_score_for_submission(user_id,exercise_id,score);
            }
            res.status(200).json(submissions);
        } catch (error) {
            res.status(500).json({status: 'Invalid information'});
            throw error;
        }
    }

    async submissionImportFinalScore(req, res) {
        try {
            const finalScores = req.body;
            for (const finalScore of finalScores) {
                const user_id = finalScore.user_id;
                const course_id = finalScore.course_id;
                const finalscore = finalScore.finalscore;
                await Course_Student.updateFinalScore(user_id, course_id, finalscore);
            
            }
            res.status(200).json({msg: 'Successfully'})
        } catch (error) {
            res.status(500).json({status: 'Invalid information'});
            throw error;
        }
    }

    async updateScore(req,res){
        const exercise_id = req.body.data.exercise_id;
        const user_id = req.body.data.user_id;
        const score = req.body.data.score;
        await Submission.update_score(exercise_id, user_id, score);
        res.json({message: 'ok'});
    }

    async downloadSingle(req, res) {
        const exercise_id = req.body.exercise_id;
        const course_id = req.body.course_id;
        let course_name = req.body.course_name;
        course_name = course_name.replace(/\s+/g, '_');
        course_name = course_name.replace(/[\/\\:*?"<>|]/g, '');
        course_name = course_name + `-${course_id}`;
    
        let exercise_name = req.body.exercise_name;
        exercise_name = exercise_name.replace(/\s+/g, '_');
        exercise_name = exercise_name.replace(/[\/\\:*?"<>|]/g, '');
        exercise_name = exercise_name + `-${exercise_id}`;
    
        const fileName = req.body.fileName; 
    
        const filePath = path.join(__dirname, `../Submission/${course_name}/${exercise_name}/${fileName}`);
    
        try {
            if (fs.existsSync(filePath)) {
                res.download(filePath);
            } else {
                res.status(404).json({ error: 'File not found.' });
            }
        } catch (error) {
            console.error('Error during downloadSingle:', error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
}

module.exports = new TeacherController();
