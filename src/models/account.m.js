const db = require('../database/db');
const tbName = 'Account';
module.exports = class Account {

    constructor({ email, password }) {
        this.Email = email;
        this.Password = password;
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
    static async insert(account) {
        try {
            await db.insert(tbName, account);
        }
        catch (error) {
            throw error;
        }
    }
};