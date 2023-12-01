const db = require('../database/db');
const tbName = 'Topic';
module.exports = class Topic {

    constructor({course_id,user_id,topic_name,Description }) {
        this.Course_id=course_id;
        this.User_id=user_id;
        this.Topic_name=topic_name;
        this.Description=Description;
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
            await db.insert(tbName, topic);
        }
        catch (error) {
            throw error;
        }
    }
};