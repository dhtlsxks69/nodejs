const zlib = require('zlib');
const fs = require('fs');

// createGzip() 이라는 메서드가 스트림을 지원하므로 readStream과 writeStream 중간에서 파이핑을 할 수 있다.
// 버퍼가 전달되다가 gzip 압축을 거친 후 파일로 써진다.
const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);