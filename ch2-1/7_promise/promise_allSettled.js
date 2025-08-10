const promise1 = Promise.resolve('성공1');
const promise2 = Promise.reject('실패2');
const promise3 = Promise.resolve('성공3');
Promise.allSettled([promise1, promise2, promise3])
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.error(error);
});
// Promise.allSettled를 사용하면 결과값이 좀 더 자세해져서 
// 어떤 프로미스가 reject 되었는지 status를 통해 알 수 있음.
// 실패 이유는 reason에 들어 있음.
// Promise.all 대신 Promise.allSettled를 사용하는 것을 권장함.