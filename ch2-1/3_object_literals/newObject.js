const newObject = {
  sayJS() {
    console.log('JS'); // 메서드에 함수를 연결할 때 더는 콜론(:)과 function을 붙이지 않아도 됨.
  },
  sayNode, // 속성명과 변수명이 동일한 경우 한 번만 써도 됨.
  [es + 6]: 'Fantastic', // 객체 리터럴 안에 동적 속성을 선언해도 됨.
};
newObject.sayNode();
newObject.sayJS();
console.log(newObject.ES6);