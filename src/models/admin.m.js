const db = require('../database/db');
const tbName = 'Admin';
module.exports = class Admin {

    constructor({ user_id }) {
        this.User_id=user_id;
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
    static async insert(admin) {
        try {
            await db.insert(tbName, admin);
        }
        catch (error) {
            throw error;
        }
    }
};