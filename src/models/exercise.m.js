const db = require('../database/db');
const tbName = 'Exercise';
module.exports = class Exercise {

    constructor({ topic_id, Exercise_name, OpenTime, DueTime, Description }) {
        this.Topic_id = topic_id;
        this.Exercise_name = Exercise_name;
        this.OpenTime = OpenTime;
        this.DueTime = DueTime;
        this.Description = Description;
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
            await db.insert(tbName, exercise);
        }
        catch (error) {
            throw error;
        }
    }
};