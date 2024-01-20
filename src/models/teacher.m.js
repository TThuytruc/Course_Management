const db = require('../database/db');
const tbName = 'teacher';
module.exports = class Teacher {

    constructor({ user_id }) {
        this.user_id = user_id;
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
    static async insert(teacher) {
        try {
            const data=await db.insert(tbName, teacher,'user_id');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    static async add_teacher_to_course(courseId,userId) {
        try {
            await db.addTeacher(courseId, userId);
        }
        catch (error) {
            throw error;
        }
    }
};