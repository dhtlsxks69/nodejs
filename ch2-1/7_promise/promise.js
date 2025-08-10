const condition = true; // true이면 resolve, false이면 reject
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('성공');
  } else {
    reject('실패');
  }
});

// 다른 코드가 들어갈 수 있음
promise
  .then((message) => {
  	console.log(message); // 성공(resolve)한 경우 실행
})
  .catch((error) => {
  	console.log(error); // 실패(reject)한 경우 실행
})
  .finally(() => { // 끝나고 무조건 실행
  	console.log('무조건');
});