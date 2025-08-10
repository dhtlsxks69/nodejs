// add1 ~ add4와 not1, not2는 같은 기능을 하는 함수이다.
function add1(x, y) {
  return x + y;
}

const add2 = (x, y) => {
  return x + y;
}

const add3 = (x, y) => x + y;

const add4 = (x, y) => (x + y);

function not1(x) {
  return !x;
}

const not2 = x => !x;