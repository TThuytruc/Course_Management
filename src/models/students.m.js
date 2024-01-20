const db = require('../database/db');
const tbName = 'student';
module.exports = class Student {

    constructor({ User_id }) {
        this.user_id=User_id;
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
    static async insert(student) {
        try {
            const data=await db.insert(tbName, student,'user_id');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    static async add_student_to_course(courseId,userId) {
        try {
            await db.addStudent(courseId, userId);
        }
        catch (error) {
            throw error;
        }
    }
};