const Course_student=require('../models/course_student.m');
const Student=require('../models/students.m');
const db= require('../database/db')
class ListStundentController {
    constructor()
    {
        this.listStudent="abc";
    }
    index(req,res, next) {
        const listStudent=ListStundentController.listStudent;
        res.render('list_student/list_student',listStudent);
    };
    
    async loadListStudent(req,res){
        const id_course=req.body.id_course;
        const dataUserAccount= await db.getAllInforUser();
        const listIDStudent= await Course_student.getCondition('course_id',id_course);
        const dataReturn= dataUserAccount.filter(objA => listIDStudent.some(objB => objB.user_id === objA.user_id));
        let count=0;
        for(const item of dataReturn)
        {
            item['finalscore']=listIDStudent[count].finalscore;
            ++count;
        }
        // console.log(dataReturn);
        count=0;    
        ListStundentController.listStudent={array:dataReturn};
        res.send({data:'0k'});
    }
}

module.exports = new ListStundentController();