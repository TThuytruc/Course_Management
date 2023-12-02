const db = require('../database/db');
const tbName = 'Teacher';
module.exports = class Teacher {

    constructor({ user_id }) {
        this.User_id = user_id;
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
            const data=await db.insert(tbName, teacher,'User_id');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};