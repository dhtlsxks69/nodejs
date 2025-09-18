const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
// 이전과는 다르게 라우터의 미들웨어를 다른 곳에서 불러온다.
// 아래의 변수와 같이 라우터 마지막에 위치해 클라이언트에 응답을 보내는 미들웨어를 컨트롤러라고 한다.
const { renderProfile, renderJoin, renderMain, renderHashtag } = require('../controllers/page');

const router = express.Router();

router.use((req, res, next) => {
    // res.locals로 값을 설정하는 이유는 user와 followerCount, followingCount, followingIdList 변수는 모든 템플릿 엔진에서 공통으로 사용하기 때문이다.
    res.locals.user = req.user; // user 객체를 통해 넌적스에서 사용자 정보에 접근할 수 있게 되었다.
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
});

router.get('/profile', isLoggedIn, renderProfile);

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/', renderMain);

router.get('/hashtag', renderHashtag);

module.exports = router;