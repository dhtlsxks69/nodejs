var sayNode = function() {
  console.log('Node');
};
var es = 'ES';
var oldObject = {
  sayJS: function() {
    console.log('JS');
  },
  sayNode: sayNode, // 속성명 : 변수명
};
oldObject[es + 6] = 'Fantastic'; // ES6라는 속성명을 만들려면 객체 리터럴 바깥에서 해야함.
oldObject.sayNode();
oldObject.sayJS();
console.log(oldObject.ES6);