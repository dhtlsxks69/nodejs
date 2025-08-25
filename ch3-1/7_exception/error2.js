const fs = require('fs');

setInterval(() => {
    // fs.unlink로 존재하지 않는 파일을 지우고있다.
    // 에러가 발생하지만, 다행히 노드 내장 모듈의 에러는 실행 중인 프로세스를 멈추지 않는다.
    // 파일 시스템 예제에서는 에러가 발생했을 때 에러늘 throw했는데 throw하면 노드 프로세스가 멈춰버린다.
    // throw하는 경우에는 반드시 try/catch문으로 throw한 에러를 잡아야한다.
    fs.unlink('./abcdefg.js', (err) => {
        if (err) {
            console.error(err);
        }
    });
}, 1000);