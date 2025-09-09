const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

// GET '/'로 접속했을 때의 라우터
// 몽구스도 기본적으로 프로미스를 지원하므로 async/await과 try/catch문을 사용해서
// 각각 조회 성공 시와 실패 시의 정보를 얻을 수 있다.
// 미리 데이터베이스에서 데이터를 조회한 후 템플릿 렌더링에 사용할 수 있다.
router.get('/', async (req, res, next) => {
    try {
         // User.find({}) 메서드로 모든 사용자를 찾은 뒤,
         // mongoose.html을 렌더링할 때 users 변수로 넣는다.
         // 몽고디비의 db.users.find({}) 쿼리와 같다.
        const users = await User.find({});
        res.render('mongoose', { users });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;