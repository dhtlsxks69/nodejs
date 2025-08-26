// globalB에서 넣은 global.message 값을 globalA에서도 접근할 수 있다.
const A = require('./globalA');

global.message = '안녕하세요'; // global 객체에 속성명이 message인 값을 대입
console.log(A()); // globalA 모듈의 함수를 호출