const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456';
const iv = '1234567890123456';

// crypto.createCipheriv(알고리즘, 키, iv) : 암호화 알고리즘과 키, iv를 넣는다.
// aes-256-cbc 알고리즘을 사용했으며, 다른 알고리즘 사용이 가능하다.
// aes-256-cbc 알고리즘의 경우 키는 32바이트, iv는 16바이트여야 한다.
const cipher = crypto.createCipheriv(algorithm, key, iv);
// cipher.update(문자열, 인코딩, 출력 인코딩) : 암호화할 대상과 대상의 인코딩, 출력 결과물을 넣는다. 
// 보통 문자열은 utf8 인코딩을, 암호는 base64를 많이 사용한다.
let result = cipher.update('암호화할 문장', 'utf-8', 'base64');
// cipher.final(출력 인코딩) :출력 결과물의 인코딩을 넣으면 암호화가 안료된다.
result += cipher.final('base64');
console.log('암호화:', result);

// crypto.createDecipheriv(알고리즘, 키, iv) : 복호화할 때 사용된다.
// 암호화할 때 사용했던 알고ㅗ리즘과 키, iv를 그대로 넣어야한다.
const decipher = crypto.createDecipheriv(algorithm, key, iv);
// decipher.update(문자열, 인코딩, 출력 인코딩) : 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩을 넣는다.
// createCipheriv의 update()에서 utf8, base64 순으로 넣었다면 createDecipheriv의 update()에서는 반대로 넣으면 된다.
let result2 = decipher.update(result, 'base64', 'utf8');
// decipher.final(출력 인코딩) : 복호화 결과물의 인코딩을 넣는다.
result2 += decipher.final('utf8');
console.log('복호화:', result2);