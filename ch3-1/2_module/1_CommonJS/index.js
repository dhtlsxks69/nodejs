const { odd, even } = require('./var');
const checkNumber = require('./func'); // func.js 에서는 chekcOddOrEven인데 index.js 에서는 checkNumber 이름으로 사용되고 있다.

function checkStringOddOrEven(str) {
    if (str.length % 2) { // 홀수이면
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));