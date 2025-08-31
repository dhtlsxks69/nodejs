const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

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
// express-session
// 인수: session에 대한 설정
app.use(session({
    resave: false, // resave : 요청이 올 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지 설정
    saveUninitialized: false, // saveUninitialized : 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
    secret: process.env.COOKIE_SECRET,
    cookie: { // cookie : 세션 쿠키에 대한 설정
        httpOnly: true, // httpOnly : 클라이언트에서 쿠키를 확인하지 못하게 함
        secure: false // secure : false는 https가 아닌 환경에서도 사용할 수 있게 하고, true는 배포할 때 설정
        // 코드에는 나와있지 않지만 store라는 옵션도 있다. 데이터베이스에 연결해 세션을 유지
    },
    name: 'session-cookie'
}));

const multer = require('multer');
const fs = require('fs');

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
	storage: multer.diskStorage({ // 어디에(destination) 어떤 이름(filename) 저장할지를 넣는다.
    	destination(req, file, done) {
        	done(null, 'uploads/');
        },
      	filename(req, file, done) {
            // 한글 깨짐 현상
          	// 하지만 originalname의 한글 깨짐은 바뀌지 않음
          	// uploads 폴더의 저장될 때 한글 깨짐 현상 고침
            const fileName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        	const ext = path.extname(fileName);
          	done(null, path.basename(fileName, ext) + Date.now() + ext);
        }
    }),
  	limits: { fileeSize: 5 * 1024 * 1024 }
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart2.html'));
});

app.post('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
    const fixedFiles = normalizeFiles(req.files);
  	console.log(fixedFiles, req.body);
    // console.log(req.files, req.body);
  	res.send('ok');
});

// 한글 깨짐 방지용 함수
function normalizeFiles(files) {
  const result = {};
  for (const field in files) {
    result[field] = files[field].map(file => ({
      ...file,
      originalname: Buffer.from(file.originalname, 'latin1').toString('utf8'),
    }));
  }
  return result;
}

/* 파일을 하나만 업로드하는 방법 (multipart.html)
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file, req.body);
    res.send('ok');
});
*/

/*
여러 파일을 업로드하는 방법 (multipart2.html)
app.post('/upload', upload.array('many', (req,res) => {
    console.log(req.files, req.body);
    res.send('ok');
}));
*/

/*
여러 파일을 업로드하는 방법2 (multipart2.html)
app.post('/upload', upload.fields([{name: 'image1'}, {name: 'image2'}]),(req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
});
*/

/*
파일을 업로드하지 않고 멀티파트 형식으로 업로드 방법 (multipart3.html)
app.post('/upload', upload.none(), (req, res)=> {
    console.log(req.body); // 파일을 업로드하지 않았으므로 req.body만 존재
    res.send('ok');
});
*/

// app.use나 app.get같은 미들웨어를 여러개 장착 가능
app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next();
});

app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
}, (req, res) => { // 요청이 오면 무조건 에러 처리
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});

// 위에 만약 next(err)가 있는 경우 바로 이 함수가 실행됨
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});