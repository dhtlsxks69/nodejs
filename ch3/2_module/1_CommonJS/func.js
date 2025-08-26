const { odd, even } = require('./var'); 
/* 
require 함수 안에 불러올 모듈의 경로를 적음
같은 폴더 안에 파일을 만들었지만, 다른 폴더에 있는 파일도 모듈로 사용 가능
require 함수의 인수로 제공하는 경로만 잘 지정하면 된다.
파일 경로에서 js나 json 같은 확장자는 생략 가능

const { odd, even } 은 구조 분해 할당 문법이다.
*/

function checkOddOrEven(num) {
    if (num % 2) { // 홀수이면
        return odd;
    }
    return even;
}

// module.exports 에는 객체만 대입해야 하는 것은 아니며 함수나 변수 대입도 가능
module.exports = checkOddOrEven;