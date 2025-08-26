const timeout = setTimeout(() => { // 1.5초 후에 timeout 콜백 실행
    console.log('1.5초 후 실행');
}, 1500);

const interval = setInterval(() => { // 1초 후에 interval 콜백 실행
    console.log('1초마다 실행');
}, 1000);

const timeout2 = setTimeout(() => {
    console.log('실행되지 않습니다');
}, 3000);

setTimeout(() => { // 2.5초가 지났을 때 clearTimeout, clearInverval 실행
    clearTimeout(timeout2);
    clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => { // 제일 먼저 실행
    console.log('즉시 실행');
});

const immediate2 = setImmediate(() => {
    console.log('실행되지 않습니다');
});

clearImmediate(immediate2); // clearImmediate를 사용해서 취소했으므로 실행되지 않음
// 코드 실행 3초 후에는 아무 로그도 남지 않는다