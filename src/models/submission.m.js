const db = require('../database/db');
const tbName = 'Submission';
module.exports = class Submission {

    constructor({ user_id,exercise_id,SubmissionTime,Score }) {
        this.User_id=user_id;
        this.Exercise_id=exercise_id;
        this.SubmissionTime=SubmissionTime;
        this.Score=Score;
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
    static async insert(submission) {
        try {
            const data=await db.insert(tbName, submission,'User_id');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};