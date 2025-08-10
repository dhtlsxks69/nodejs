const candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy() {
    this.status.count--;
    return this.status.count;
  },
};
// candyMachine 객체 안의 속성을 찾아서 getCandy, count 변수가 초기화 된 것이다.
const { getCandy, status: { count } } = candyMachine;