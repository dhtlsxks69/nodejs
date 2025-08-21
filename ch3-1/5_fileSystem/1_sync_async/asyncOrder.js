const fs = require('fs');

console.log('시작');
// readFile 콜백 다음 readFile을 넣으면 된다.
// 이른바 '콜백 지옥'이 펼쳐지지만 적어도 순서가 어긋나는 일은 없다.
fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
    fs.readFile('./readme2.txt', (err, data) => {
        if (err) {
            throw err;
        }
        console.log('2번', data.toString());
        fs.readFile('./readme2.txt', (err, data) => {
            if (err) {
                throw err;
            }
            console.log('3번', data.toString());
            console.log('끝');
        });
    });
});