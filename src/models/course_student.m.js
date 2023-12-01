const db = require('../database/db');
const tbName = 'Course_Student';
module.exports = class Course_Student {

    constructor({ course_id, user_id,FinalScore }) {
        this.Course_id=course_id;
        this.User_id=user_id;
        this.FinalScore=FinalScore;
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
    static async insert(course_student) {
        try {
            await db.insert(tbName, course_student);
        }
        catch (error) {
            throw error;
        }
    }
};