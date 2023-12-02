const db = require('../database/db');
const tbName = 'topic';
module.exports = class Topic {

    constructor({course_id,topic_name,Description }) {
        this.course_id=course_id;
        this.topic_name=topic_name;
        this.description=Description;
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
    static async insert(topic) {
        try {
            const data=await db.insert(tbName, topic,'course_id');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};