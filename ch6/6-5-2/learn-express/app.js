const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); // views는 템플릿 파일들이 위치한 폴더를 지정
app.set('view engine', 'html'); // view engine은 어떤 종류의 템플릿 엔진을 사용할지 나타냄. 넌적스임을 구분하려면 njk를 쓰면 됨.

nunjucks.configure('views', { // 폴더 경로
    express: app, // express 속성에 app 객체를 연결
    watch: true // true이면 HTML 파일이 변경될 때 템플릿 엔진을 다시 렌더링함
});

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
    name: 'session-cookie'
}));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    // res.status(404).send('Not Found');
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    // console.error(err);
    // res.status(500).send(err.message);
    res.locals.message = err.message; // res.locals 속성에 값을 대입해 템플릿 엔진에 변수를 주입. message 변수 넣음.
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 배포 환경이 아닌 경우에만 표시. process.env.NODE_ENV : 시스템 환경
    res.status(err.status || 500);
    res.render('error'); // error.html 파일이 렌더링 됨
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});