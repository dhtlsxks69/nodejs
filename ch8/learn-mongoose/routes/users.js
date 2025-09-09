const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

// GET '/users'와 POST '/users' 주소로 요청이 들어올 때 라우터이다.
router.route('/')
// GET '/users'에서는 데이터를 JSON 형식으로 반환한다.
.get(async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error(err);
        next(err);
    }
})
.post(async (req, res, next) => {
    try {
        // 사용자를 등록할 때는 먼저 모델 .create 메서드로 저장한다.
        const user = await User.create({
            name: req.body.name,
            age: req.body.age,
            married: req.body.married
        });
        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// GET '/users/:id/comments 라우터는 댓글 다큐먼트를 조회하는 라우터이다.
router.get('/:id/comments', async (req, res, next) => {
    try {
        // find 메서드에는 옵션이 추가되어 있다.
        // 먼저 댓글을 쓴 사용자의 아이디로 댓글을 조회한 뒤, populate 메서드로관련 있는 컬렉션의 다큐먼트를 불러올 수 있다.
        // Comment 스키마 commenter 필드의 ref가 User로 되어 있으므로,
        // 자동으로 users 컬렉션에서 사용자 다큐먼트를 찾아 합친다.
        const comments = await Comment.find({ commenter: req.params.id }).populate('commenter');
        console.log(comments);
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;