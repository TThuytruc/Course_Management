const db = require('../database/db');
const tbName = 'Student';
module.exports = class Student {

    constructor({ User_id }) {
        this.User_id=User_id;
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
            await db.insert(tbName, student);
        }
        catch (error) {
            throw error;
        }
    }
};