const http = require('http');

http.createServer((req, res) => {
    // res.writeHead : 응답에 대한 정보를 기록
    // 첫 번째 인수로 성공적인 요청을 의미하는 200
    // 두 번째 인수로 응답에 대한 정보를 보내는데, 콘텐츠의 형식이 HTML임을 알리고 있다.
    // 한글 표시를 위해 charset을 utf-8로 지정했다.
    // 이 정보가 기록되는 부분을 헤더(Header)라고 한다.
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8 '});
    // res.write : 첫 번째 인수를 클라이언트로 보낼 데이터
    // 데이터가 기록되는 부분을 본문(body)라고 한다.
    res.write('<h1>Hello Node!</h1>');
    // res.end : 응답을 종료하는 메서드
    res.end('<p>Hello Server!');
})
.listen(8080, () => { // 서버 연결
    console.log('8080번 포트에서 서버 대기 중입니다!');
});