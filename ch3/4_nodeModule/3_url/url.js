const url = require('url');
// url 모듈 안에는 URL 생성자가 있다.
// URL은 노드 내장 객체이기도 해서 require할 필요없다.
// 이 생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리된다.
// 이 방식이 WHATWG의 url이다.
// 속성으로 username, password, origin, searchParams가 존재한다.

const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL)); // url.format(객체) : 분해되었던 url 객체를 다시 원래 상태로 조립