const express = require('express');
const Comment = require('../schemas/comment');

const router = express.Router();

// 댓글에 관련된 CRUD 작업을 하는 라우터이다.
// POST '/comments', PATCH '/comments/:id', DELETE '/comments/:id'를 등록했다.
// POST '/comments' 라우터는 다큐먼트를 등록하는 라우터이다.
router.post('/', async (req, res, next) => {
    try {
        // Comment.create 메서드로 댓글을 저장한다.
        // 그 후 populate 메서드로 프로미스의 결과로 반환된 comment 객체에 다른 컬렉션 다큐먼트를 불러온다.
        const comment = await Comment.create({
            commenter: req.body.id,
            comment: req.body.comment
        });
        console.log(comment);
        const result = await Comment.populate(comment, { path: 'commenter' });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id')
// PATCH '/comments/:id' 라우터는 다큐먼트를 수정하는 라우터이다.
.patch(async (req, res, next) => {
    try {
        // updateOne 메서드의 첫 번째 인수로는 어떤 다큐먼트를 수정할지를 나타낸 쿼리 객체를 제공한다.
        // 두 번째 인수로는 수정할 필드와 값이 들어 있는 객체를 제공한다.
        // 몽고디비와 다르게 $set 연산자를 사용하지 않아도 기입한 필드만 바꾼다.
        const result = await Comment.updateOne({
            _id: req.params.id
        }, {
            comment: req.body.comment
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
})
// DELETE '/comments/:id' 라우터는 다큐먼트를 삭제하는 라우터이다.
.delete(async (req, res, next) => {
    try {
        // deleteOne 메서드는 어떤 다큐먼트를 삭제할지에 대한 조건을 첫 번째 인수에 넣는다.
        const result = await Comment.deleteOne({ _id: req.params.id });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;