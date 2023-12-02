

const fs = require('fs');
const { as } = require('pg-promise');
const pgp = require('pg-promise')({
    capSQL: true
});
const cn = {
    // Sử dụng 1 trong 2 đoạn code dưới để chọn giá trị các thuộc tính.


    // host: 'localhost',
    // port: 5432,
    // database: 'db21537',
    // user: 'postgres',
    // password: '1234'


    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    // database: "postgres", // Thay đổi DB_NAME thành database
    // user: process.env.DB_USER,
    // password: process.env.DB_PW
};

// Sau khi chọn xong thuộc tính trong cn, hãy connect database
// const db = pgp(cn);
module.exports = {
    getAll: async (tbName) => {
        let dbcn = null;
        try {
            const query= `SELECT * FROM "${tbName}"`;
            console.log(query);
            // dbcn = await db.connect();
            // const data = await dbcn.any(query);

            // console.log(data);
            // return data;
        }
        catch (error) {
            throw error;
        }
        // finally {
        //     dbcn.done();
        // }
    },
    getCondition: async (tbName, tbColum, value) => {
        let dbcn = null;
        try {
            const query=`SELECT * FROM "${tbName}" WHERE ${tbColum}='${value}'`;
            console.log(query);
            // dbcn = await db.connect();

            // const data = await dbcn.any(query);

            // console.log(data);
            // return data;
        }
        catch (error) {
            throw error;
        }
        // finally {
        //     dbcn.done();
        // }
    },
    insert:async (tbName,entity,idreturn)=>{
        const query=pgp.helpers.insert(entity,null,tbName);
        console.log(query);

        // const data= await db.one(query);
        // const data=await db.one(query + ` RETURNING "${idreturn}"`);

        return data;
    }
};