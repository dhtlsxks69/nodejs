const express = require('express');
const { renderLogin, createDomain } = require('../controllers');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

// GET / 라우터
router.get('/', renderLogin);

// POST /domain 라우터(도메인 등록)
router.post('/domain', isLoggedIn, createDomain);

module.exports = router;