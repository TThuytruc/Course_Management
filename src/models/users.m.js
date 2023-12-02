const db = require('../database/db');
const tbName = 'user_';
module.exports = class User {

    constructor({ account_id,Name,Role}) {
        this.account_id=account_id;
        this.user_name=Name;
        this.user_role=Role;
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
    static async insert(user) {
        try {
            const data=await db.insert(tbName, user,'account_id');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};