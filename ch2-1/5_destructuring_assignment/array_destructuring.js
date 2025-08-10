const array = ['nodejs', {}, 10, true];
// obj와 bool 사이의 요소인 10에는 변수명을 지어주지 않았으므로 10은 무시한다.
const [node, obj, , bool] = array;