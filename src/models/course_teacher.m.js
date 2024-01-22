const db = require('../database/db');
const tbName = 'course_teacher';
module.exports = class Course_Teacher {

    constructor({  course_id,user_id }) {
        this.user_id = user_id;
        this.course_id = course_id;
    }
    static async getAll() {
        try {
            const data = await db.getAll(tbName);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    static async getCondition(tbColum, value) {
        try {
            const data = await db.getCondition(tbName, tbColum, value);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    static async insert(teacher_course) {
        try {
            const data=await db.insert(tbName, teacher_course,'user_id');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};