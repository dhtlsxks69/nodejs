const { 
    Worker, isMainThread, parentPort
} = require('worker_threads');

// isMainThread를 통해 현재 코드가 메인 스래드에서 실행되는지, 아니면 우리가 생성한 워커 스레드에서 실행되는지 구분된다.
if (isMainThread) { // 부모일 때
    // 워커 생성 후 worker.postMessage로 워커에 데이터를 보낼 수 있다.
    // 워커는 parentPort.on('message') 이벤트 리스너로 부모로부터 메시지를 받고, parentPort.postMessage로 부모에게 메시지를 보낸다.
    // 부모는 worker.on('message')로 메시지를 받는다. 메시지를 한 번만 받고 싶으면 once('message')를 사용하면 된다.
    // 워커에서 on 메서드를 사용할 때는 직접 워커를 종료해야 한다.
    // parentPort.close()를 하면 부모와의 연결이 종료된다.
    // 종료될 때 worker.on('exit')이 실행된다.
    const worker = new Worker(__filename);
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => console.log('worker exit'));
    worker.postMessage('ping');
} else {
    parentPort.on('message', (value) => {
        console.log('from parent', value);
        parentPort.postMessage('pong');
        parentPort.close();
    });
}