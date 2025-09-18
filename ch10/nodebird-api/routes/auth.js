// 회원 가입, 로그인, 로그아웃 라우터
const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

const router = express.Router();

// POST /auth/join
router.post('/join', isNotLoggedIn, join);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// GET /auth/kakao
// GET /auth/kakao로 접근하면 카카오 로그인 과정이 시작된다.
// GET /auth/kakao에서 로그인 전략(kakaoStrategy)을 수행하는데, 처음에는 카카오 로그인 창으로 리다이렉트한다.
// 그 창에서 로그인 후 성공 여부 결과를 GET /auth/kakao/callback로 받는다.
router.get('/kakao', passport.authenticate('kakao'));

// GET /auth/kakao/callback
// 카카오 로그인 전략(kakaoStrategy)을 다시 수행한다.
// 로컬 로그인과 다른 점은 passport.authenticate 메서드에 콜백 함수를 제공하지 않는다는 점이다.
// 카카오 로그인은 로그인 성공 시 내부적으로 req.login을 호출하므로 우리가 직접 호출할 필요없다.
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?error=카카오로그인 실패' // 로그인에 실패했을 때 어디로 이동할지 failureRedirect 속성에 적는다.
}), (req, res) => { // 성공 시에도 어디로 이동할지 적는 미들웨어
    res.redirect('/'); // 성공 시에는 /로 이동
});

module.exports = router;