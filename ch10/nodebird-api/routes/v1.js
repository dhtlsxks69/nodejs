const express = require('express');

const { verifyToken, deprecated } = require('../middlewares');
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v1');

const router = express.Router();

router.use(deprecated);

// POST /v1/token
router.post('/token', createToken);

// POST /v1/test
router.get('/test', verifyToken, tokenTest);

// GET /v1/psots/my
// 내가 올린 포스트 검색 결과 라우터
router.get('/posts/my', verifyToken, getMyPosts);

// GET /v1/posts/hashtag/:title
// 내가 해시태그 검색 결과 라우터
router.get('/posts/hashtag/:title', verifyToken, getPostsByHashtag);

module.exports = router;