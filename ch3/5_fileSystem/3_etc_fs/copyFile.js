const fs = require('fs').promises;

fs.copyFile('../2_buffer_stream/readme4.txt', '../2_buffer_stream/wrtieme4.txt')
.then(() => {
    console.log('복사 완료');
})
.catch((error) => {
    console.error(error);
});