require('dotenv').config();
const fs = require('fs');
const XLSX = require('xlsx');
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
            const query = `SELECT * FROM ${tbName}`;
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
            if (dbcn != null) {
                dbcn.done();
            }
        }
    },

    getCondition: async (tbName, tbColum, value) => {
        let dbcn = null;
        try {
            const query = `SELECT * FROM ${tbName} WHERE ${tbColum}='${value}'`;
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
            if (dbcn != null) {
                dbcn.done();
            }
        }
    },

    insert: async (tbName, entity, idreturn) => {
        const query = pgp.helpers.insert(entity, null, tbName);
        console.log(query);

        const data = await db.one(query + ` RETURNING ${idreturn}`);

        return data;
    },

    getAllInforUser: async () => {
        let dbcn = null;
        try {
            const query = `select user_.user_id,account.account_email,user_.user_name  from account  join user_  on account.account_id=user_.account_id`;
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
            if (dbcn != null) {
                dbcn.done();
            }
        }
    },

    getUserWithAccountId: async (accountId) => {
        let dbcn = null;
        try {
            const query = `SELECT get_user_with_account_id($1)`;
            // console.log(query);
            dbcn = await db.connect();

            const data = await dbcn.any(query, [accountId]);
            console.log(data[0].get_user_with_account_id);
            const resultString = data[0].get_user_with_account_id;
            const matches = resultString.match(/\(([^)]+)\)/);
            const values = matches[1].split(',');

            const userObject = {
                user_id: parseInt(values[0]),
                account_id: parseInt(values[1]),
                user_name: values[2].replace(/"/g, ''), // Remove double quotes from the name
                user_role: values[3].replace(/"/g, ''), // Remove double quotes from the role
            };
            console.log(userObject);
            return userObject;
        }
        catch (error) {
            throw error;
        }
        finally {
            if (dbcn != null) {
                dbcn.done();
            }
        }
    },

    countItem: async (tbName, tbColum, tbValue) => {
        let dbcn = null;
        try {
            const query = `select count(*) from ${tbName} where ${tbColum}='${tbValue}' `;
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
            if (dbcn != null) {
                dbcn.done();
            }
        }
    },

    getByJoin: async (tbName1, tbName2, tbColumn, value) => {
        let dbcn = null;
        try {
            const query = `select * from ${tbName1} natural join ${tbName2} where ${tbName1}.${tbColumn} = ${value}`;

            dbcn = await db.connect();

            const data = await dbcn.any(query);
            return data;
        }
        catch (error) {
            throw error;
        }
        finally {
            if (dbcn != null) {
                dbcn.done();
            }
        }
    },

    getUpcommingEvents: async (courseId) => {
        let dbcn = null;

        try {
            const query = `select * from exercise join topic 
            on exercise.topic_id = topic.topic_id
            where duetime > NOW() and topic.course_id = ${courseId}`;

            dbcn = await db.connect();

            const data = await dbcn.any(query);
            return data;
        }
        catch (error) {
            throw error;
        }
        finally {
            if (dbcn != null) {
                dbcn.done();
            }
        }
    },

    getFinalScore: async (courseId, userId) => {
        let dbcn = null;

        try {
            const query = `select finalscore from course_student 
            where course_id = ${courseId} and user_id = ${userId}`;

            dbcn = await db.connect();

            const data = await dbcn.any(query);
            return data;
        }
        catch (error) {
            throw error;
        }
        finally {
            if (dbcn != null) {
                dbcn.done();
            }
        }
    },

    importDataFromExcel: async (filePath) => {
        let dbcn = null;
        try {
          const workbook = XLSX.readFile(filePath);
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
          for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];
            const query = `INSERT INTO Course_Student(Course_id, User_id) VALUES ($1, $2)`;
            const values = [row.column1, row.column2]; 
            dbcn = await db.connect();
            await dbcn.query(query, values);
          }
        } 
        catch (error) {
            throw error;
        }
        finally {
            if (dbcn != null) {
                dbcn.done();
            }
        }
      },
};
