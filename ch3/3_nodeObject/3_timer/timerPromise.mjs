// 프로미스 기반이므로 then 대신 await을 사용하기 위해 ES 모듈 사용했으며,
// timers/promises라는 모듈에서 setTimeout과 setInterval을 새롭게 제공한다.
// setTimeout(밀리초)로 몇 밀리초를 기다릴지 정할 수 있고,
// setInterval(밀리초, 시작값)은 for await of 문법과 함께 사용할 수 있다.
// 시작값은 필수값이 아니다.
import { setTimeout, setInterval } from 'timers/promises'

await setTimeout(3000);
console.log('3초 뒤 실행');

for await (const startTime of setInterval(1000, Date.now())) {
    console.log('1초마다 실행', new Date(startTime));
};