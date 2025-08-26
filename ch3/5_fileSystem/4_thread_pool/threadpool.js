const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

// 실행할 때마다 시간과 순서가 달라진다.
// 어느 것이 먼저 처리될지 모르지만, 하나의 규칙이 있다.
// 1~4와 5~8이 그룹으로 묶여있고, 5~이 1~4보다 시간이 더 소요된다.
// 기본적인 스레드 풀의 개수가 4개이기 때문이다.
// 만약 컴퓨터의 코어 개수가 4보다 작으면 다른 결과가 생길 수 있다.
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('1:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('2:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('3:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('4:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('5:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('6:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('7:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
    console.log('8:', Date.now() - start);
});