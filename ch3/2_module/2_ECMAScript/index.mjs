import { odd, even } from './var.mjs';
import checkNumer from './func.mjs';

function checkStringOddOrEven(str) {
    if (str.length % 2) { // 홀수이면
        return odd;
    }
    return even;
}

console.log(checkNumer(10));
console.log(checkStringOddOrEven('hello'));