const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { afterUploadImage, uploadPost } = require('../controllers/post');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            // 한글 깨짐 현상
            // 하지만 originalname의 한글 깨짐은 바뀌지 않음
            // uploads 폴더의 저장될 때 한글 깨짐 현상 고침
            const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
            const ext = path.extname(originalName);
            cb(null, path.basename(originalName, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
});

// app.use('/post')를 할 것이므로 앞에 /post 경로가 붙었다.
// POST /post/img
// 이미지 하나를 업로드받은 뒤 이미지의 저장 경로를 클라이언트로 응답한다.
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

// POST /post
// 게시글 업로드를 처리하는 라우터이다.
// 이전 라우터에서 이미지를 업로드했다면 이미지 주소도 req.body.url로 전송된다.
// 데이터 형식이 multipart이긴 하지만, 이미지 데이터가 들어 있지 않으므로 none 메서드를 사용했다.
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

module.exports = router;