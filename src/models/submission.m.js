const db = require('../database/db');
const tbName = 'submission';
module.exports = class Submission {

    constructor({ user_id,exercise_id,SubmissionTime,submissionfile,Score }) {
        this.user_id=user_id;
        this.exercise_id=exercise_id;
        this.submissiontime=SubmissionTime;
        this.submissionfile=submissionfile;
        this.score=Score;
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
            const data=await db.insert(tbName, submission,'user_id');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};