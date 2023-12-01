const db = require('../database/db');
const tbName = 'Course_Teacher';
module.exports = class Course_Teacher {

    constructor({ user_id, course_id }) {
        this.User_id = user_id;
        this.Course_id = course_id;
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
            await db.insert(tbName, teacher_course);
        }
        catch (error) {
            throw error;
        }
    }
};