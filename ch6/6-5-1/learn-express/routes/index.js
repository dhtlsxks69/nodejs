const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res, next) => {
    // HTML로 렌더링하면서 { title: 'Express' }라는 객체를 변수로 집어넣음
    res.render('index', { title: 'Express' });
});

module.exports = router;