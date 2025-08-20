const crypto = require('crypto');

 // randomBytes() 메서드로 64바이트 길이의 문자열을 만든다.
 // pbkdf2() 메서드에는 순서대로 비밀번호, salt, 반복 횟수, 출력 바이트, 해시 알고리즘을 인수로 넣는다.
 // 예시에는 10만번 반복해서 적용했다.
 // 즉, sha512로 변환된 값을 다시 sha512로 변환하는 과정을 10만번 반복하는 것이다.
crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt:', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        console.log('password:', key.toString('base64'));
    });
});