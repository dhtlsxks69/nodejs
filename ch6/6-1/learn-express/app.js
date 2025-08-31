const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000); // process.env 객체에 PORT 속성이 있다면 그 값을 사용, 없다면 기본값으로 3000번 포트를 이용

app.get('/', (req, res) => { // GET / 요청 시 응답으로 'Hello, Express' 전송
    // res.write나 res.end 대신 res.send 사용
    //res.send('Hello, Express');
    res.sendFile(path.join(__dirname, '/index.html')); // 다른 html 파일을 전송하고 싶은 경우
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});