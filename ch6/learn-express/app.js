const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

// dotenv 패키지는 .env파일을 읽어서 process.env로 만든다.
// dotenv 패키지의 이름이 dot(점) + env인 이유이다.
dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000); // process.env 객체에 PORT 속성이 있다면 그 값을 사용, 없다면 기본값으로 3000번 포트를 이용

/*
app.get('/', (req, res) => { // GET / 요청 시 응답으로 'Hello, Express' 전송
    // res.write나 res.end 대신 res.send 사용
    // res.send('Hello, Express');
    res.sendFile(path.join(__dirname, '/index.html')); // 다른 html 파일을 전송하고 싶은 경우
});
*/

// dev외 combined, common, short, tiny 등을 넣으면 로그가 달라지니 직접 테스트해보자.
// dev는 개발환경, combined는 배포환경
// dev 모드 기준으로 'GET / 500 10.064 ms - 50'은 각각 [HTTP 메서드] [주소] [HTTP 상태코드] [응답속도] - [응답바이트]를 의미
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// process.env.COOKIE_SECRET에 cookiesecret 값이 할당된다. 키=값 형식으로 추가하면 된다.
// process.env를 별도의 파일로 관리하는 이유는 보안과 설정의 편의성 때문이다.
// .env 같은 별도의 파일에 비밀 키를 적어두고 dotenv 패키지로 비밀 키를 로딩하는 방식으로 관리한다.
// .env 파일만 잘 관리해도 소스 코드가 유출되도 비밀 키를 지킬 수 있다.
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
    name: 'sessiono-cookie'
}));

// app.use나 app.get같은 미들웨어를 여러개 장착 가능
app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다');
    next();
});
app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
}, (req, res) => { // 요청이 오면 무조건 에러 처리
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

// 위에 만약 next(err)가 있는 경우 바로 이 함수가 실행됨
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});