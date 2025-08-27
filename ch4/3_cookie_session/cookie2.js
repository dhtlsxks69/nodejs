const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// parseCookies : 쿠키 문자열을 쉽게 사용하기 위해 자바스크립트 객체 형식으로 바꾸는 함수.
// 실행 결과 : { mycookie: 'test' }
const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        const url = new URL(req.url, 'http://localhost:8084');
        const name = url.searchParams.get('name');
        const expires = new Date();
        // 쿠키 유효 시간을 현재 시간 +5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; expires=${expires.toGMTString()}; HttpOnly; Path=/`
        });
        res.end();
    } else if (cookies.name) {
        // 주소가 /이면서 name이라는 쿠키가 있는 경우
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        // 주소가 /이면서 name이라는 쿠키가 없는 경우
        try {
            const data = await fs.readFile(path.join(__dirname, 'cookie2.html'));
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8 '});
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
})
.listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중입니다!');
});