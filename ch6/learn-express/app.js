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

// morgan
// dev외 combined, common, short, tiny 등을 넣으면 로그가 달라지니 직접 테스트해보자.
// dev는 개발환경, combined는 배포환경
// dev 모드 기준으로 'GET / 500 10.064 ms - 50'은 각각 [HTTP 메서드] [주소] [HTTP 상태코드] [응답속도] - [응답바이트]를 의미
app.use(morgan('dev'));
// static
// 함수의 인수로 정적 파일들이 담겨 있는 폴더를 지정하면 된다.
app.use('/', express.static(path.join(__dirname, 'public')));
// body-parser
// express 4.17.0 버전부터 body-parser 미들웨어의 기능이 express에 내장되어 있어 따로 설치할 필요가 없다.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie-parser
// 비밀키 할당, process.env.COOKIE_SECRET에 cookiesecret 값(키=값 형식)이 할당됨
app.use(cookieParser(process.env.COOKIE_SECRET));
/*
res.cookie('name', 'shougun104', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
    secure: true
});
res.clearCookie('name', 'shougun104', { httpOnly: true, seccure: true });
*/
app.use(session({
    resave: false, // resave : 요청이 올 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지 설정
    saveUninitialized: false, // saveUninitialized : 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
    secret: process.env.COOKIE_SECRET,
    cookie: { // cookie : 세션 쿠키에 대한 설정
        httpOnly: true, // httpOnly : 클라이언트에서 쿠키를 확인하지 못하게 함
        secure: false // secure : false는 https가 아닌 환경에서도 사용할 수 있게 하고, true는 배포할 때 설정
        // 코드에는 나와있지 않지만 store라는 옵션도 있다. 데이터베이스에 연결해 세션을 유지
    },
    name: 'sessiono-cookie'
}));

// req.session.name = 'shougun104'; // 세션 등록
// req.sessionID; // 세션 아이디 확인
// req.session.destroy(); // 세션 모두 제거

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