const db = require('../database/db');
const tbName = 'course';
module.exports = class Course {

    constructor({ course_name, schedule, MaxNumberOfStudent }) {
        this.course_name=course_name;
        this.schedule=schedule;
        this.maxnumberofstudent=MaxNumberOfStudent;
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
    static async insert(course) {
        try {
            const data=await db.insert(tbName, course,'course_id');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    static async delete(course_id) {
        try {
            await db.deleteCourse(course_id);
        }
        catch (error) {
            throw error;
        }
    }
};