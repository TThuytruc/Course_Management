const db = require('../database/db');
const tbName = 'exercise';
module.exports = class Exercise {

    constructor({ topic_id, Exercise_name, OpenTime, DueTime, Description }) {
        this.topic_id = topic_id;
        this.exercise_name = Exercise_name;
        this.opentime = OpenTime;
        this.duetime = DueTime;
        this.description = Description;
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

    static async insert(exercise) {
        try {
            const data=await db.insert(tbName, exercise,'exercise_id');
            return data;
        }
        catch (error) {
            throw error;
        }
    }

    static async getUpcommingEvents(courseId) {
        try {
            const data=await db.getUpcommingEvents(courseId);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};