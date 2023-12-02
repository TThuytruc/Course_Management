const db = require('../database/db');
const tbName = 'User';
module.exports = class User {

    constructor({ account_id,Name,Email,Role}) {
        this.Acount_id=account_id;
        this.Name=Name;
        this.Email=Email;
        this.Role=Role;
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
            const data=await db.insert(tbName, user,'Acount_id');
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};