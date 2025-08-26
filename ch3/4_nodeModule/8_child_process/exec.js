const exec = require('child_process').exec;

const process = exec('dir'); // 리눅스나 맥이라면 exec('ls')를 대신 입력하면 된다.

process.stdout.on('data', function(data) {
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
    console.error(data.toString());
}); // 실행 에러