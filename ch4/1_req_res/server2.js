const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        // fs 모듈로 html 파일 읽기, data 변수에 저장된 버퍼를 그대로 클라이언트에 보내면 된다.
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    } catch (err) {
        console.error(err);
        // 에러 메시지는 일반 문자열이므로 text/plain을 사용했다.
        // text/plain은 HTML 태그까지 모두 보여주는 데이터 타입이다.
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
})
.listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중입니다!');
});