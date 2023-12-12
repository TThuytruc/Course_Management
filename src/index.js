const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const app = express(); //instance
const { requireAuth } = require('./middleware/auth.middleware');
const port = 3000;
const bodyParser = require('body-parser');

// const demo=require('./public/js/list_student.js')
const adminRouter = require('./routers/admin.router');
const teacherRouter = require('./routers/teacher.router');
const studentRouter = require('./routers/student.router');
const listStudentRouter = require('./routers/listStudent.router');

const siteRouter = require('./routers/site.router');


app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: false,
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//parse req.body

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(requireAuth);
app.use('/list_student', listStudentRouter);
app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);

app.use('/', siteRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
