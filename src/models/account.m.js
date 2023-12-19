const db = require('../database/db');
const tbName = 'account';
module.exports = class Account {

    constructor({ email, password }) {
        this.account_email = email;
        this.account_password = password;
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
            const data=await db.insert(tbName, account,'account_email');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    static async update(account) {
        try {
            const data= await db.update(tbName, account, 'account_id', account.account_id);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};