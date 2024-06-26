const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const app = express(); 
const { requireAuth } = require('./middleware/auth.middleware');
const port = 3000;
const bodyParser = require('body-parser');
const session = require('express-session')
app.use(session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

const adminRouter = require('./routers/admin.router');
const teacherRouter = require('./routers/teacher.router');
const studentRouter = require('./routers/student.router');
const listStudentRouter = require('./routers/listStudent.router');
const courseRouter = require('./routers/course.router')
const siteRouter = require('./routers/site.router');

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: false,
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(requireAuth);
app.use('/course', courseRouter);
app.use('/list_student', listStudentRouter);
app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use('/', siteRouter);

app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`))
