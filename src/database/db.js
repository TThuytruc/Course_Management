require('dotenv').config();
const fs = require('fs');
// const { as } = require('pg-promise');
const pgp = require('pg-promise')({
    capSQL: true
});

const cn = {
    // Sử dụng 1 trong 2 đoạn code dưới để chọn giá trị các thuộc tính.

    // // Cách 1 (nhớ thay đổi tên database và pass tùy vào máy đang chạy (của mấy ông á))
    // host: 'localhost',
    // port: 5432,
    // database: 'nmcnpm',
    // user: 'postgres',
    // password: '1234'


    // Cách 2 (có thể thay đổi các thuộc tính trong file .env)
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME, 
    user: process.env.DB_USER,
    password: process.env.DB_PW
};

// Sau khi chọn xong thuộc tính trong cn, hãy connect database
const db = pgp(cn);

module.exports = {
    getAll: async (tbName) => {
        let dbcn = null;
        try {
            const query= `SELECT * FROM ${tbName}`;
            // console.log(query);
            dbcn = await db.connect();
            const data = await dbcn.any(query);

            // console.log(data);
            return data;
        }
        catch (error) {
            throw error;
        }
        finally {
            dbcn.done();
        }
    },

    getCondition: async (tbName, tbColum, value) => {
        let dbcn = null;
        try {
            const query=`SELECT * FROM ${tbName} WHERE ${tbColum}='${value}'`;
            console.log(query);
            dbcn = await db.connect();

            const data = await dbcn.any(query);

            // console.log(data);
            return data;
        }
        catch (error) {
            throw error;
        }
        finally {
            dbcn.done();
        }
    },

    insert:async (tbName,entity,idreturn)=>{
        const query=pgp.helpers.insert(entity,null,tbName);
        console.log(query);

        const data=await db.one(query + ` RETURNING ${idreturn}`);

        return data;
    },
    getAllInforUser:async()=>{
        let dbcn = null;
        try {
            const query=`select user_.user_id,account.account_email,user_.user_name  from account  join user_  on account.account_id=user_.account_id`;
            console.log(query);
            dbcn = await db.connect();

            const data = await dbcn.any(query);

            // console.log(data);
            return data;
        }
        catch (error) {
            throw error;
        }
        finally {
            dbcn.done();
        }
    }
};