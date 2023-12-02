const db = require('../database/db');
const tbName = 'Course';
module.exports = class Course {

    constructor({ course_name, numberOfStudent,numberOfTeacher,Row,MaxNumberOfStudent }) {
        this.Course_name=course_name;
        this.NumberOfStudent=numberOfStudent;
        this.NumberOfTeacher=numberOfTeacher;
        this.Row=Row;
        this.MaxNumberOfStudent=MaxNumberOfStudent;
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
            const data=await db.insert(tbName, course,'Course_name');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};