const express = require('express');
const { searchByHashtag, getMyPosts } = require('../controllers');

const router = express.Router();

// GET /myposts
// API를 사용해 자신이 작성한 포트를 JSON 형식으로 가져오는 라우터이다.
router.get('/myposts', getMyPosts);

// GET /search/:hashtag
// API를 사용해 해시태그를 검색하는 라우터이다.
router.get('/search/:hashtag', searchByHashtag);

module.exports = router;