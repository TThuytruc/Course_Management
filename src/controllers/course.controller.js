const Course = require('../models/course.m');
const Topic = require('../models/topic.m');
const Exercise = require('../models/exercise.m');

class CourseController {
    async insert(req, res, next){ 
        try {
            const course = req.body;
            course.maxnumberofstudent = course.maxnumberofstudent === '' ? 0 : course.maxnumberofstudent;
            const data = await Course.insert(course);
            res.redirect('back');
        }
        catch(e){
            next(e);
        }
    }
    async delete(req, res, next){ 
        try {
            const course_id = req.params.id;
            // console.log(course_id); 
            await Course.delete(course_id);
            res.redirect('back')
        }
        catch(e){
            next(e);
        }
    }

    async insertTopic(req, res, next){ 
        try {
            const topic = new Topic(req.body);
            await Topic.insert(topic);
            res.redirect('back');
        }
        catch(e){
            next(e);
        }
    }

    async insertExercise(req, res, next){ 
        try {
            const data = req.body;
            const openTime = new Date(data.assignment_open_time);
            const dueTime = new Date(data.assignment_due_time);
            const topic = await Topic.getCondition('topic_name', data.assignment_topic);

            const exercise = new Exercise({
                topic_id: topic[0].topic_id,
                Exercise_name: data.assignment_name,
                OpenTime: openTime,
                DueTime: dueTime,
                Description : data.assignment_description
            })

            await Exercise.insert(exercise);
            res.redirect('back');
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = new CourseController