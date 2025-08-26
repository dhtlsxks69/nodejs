const dep2 = require('./dep2');  // dep1.js에서는 이 줄이 먼저 실행된다.
console.log('require dep2', dep2);
module.exports = () => {
    console.log('dep2', dep2);
};