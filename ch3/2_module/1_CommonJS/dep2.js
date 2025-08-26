const dep1 = require('./dep1'); // dep2.js에서는 이 줄이 먼저 실행된다.
console.log('require dep1', dep1);
module.exports = () => {
    console.log('dep1', dep1);
};