// 멈추기 전까지 계속 실행되므로 (Ctrl + C)로 종료하면 된다.
// 에러가 발색할 것 같은 부분을 미리 try/catch로 감싸면 된다.
setInterval(() => {
    console.log('시작');
    try {
        throw new Error('서버를 고장내주마!');
    } catch (err) {
        console.error(err);
    }
}, 1000);