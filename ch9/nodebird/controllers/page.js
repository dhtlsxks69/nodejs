const { User, Post, Hashtag } = require('../models');

// 컨트롤러라고 해서 특별한 것은 아니고, res.send, res.json, res.redirect, res.render 등이 존재하는 미들웨어일 뿐이다.
// renderProfile과 renderJoin은 각각 내 정보 페이지와 회원 가입 페이지를 화면에 렌더링한다.
// renderMain 컨트롤러는 메인 페이지를 렌더링하면서 넌적스에 twits(게시글 목록)를 전달한다.
// twits는 지금 빈 배열이지만 나중에 값을 넣는다.
exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird' });
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원 가입 - NodeBird' });
};

exports.renderMain = async (req, res, next) => {
    try {
        const posts = await Post.findAll({ // DB에서 게시글 조회한다.
            include: {
                model: User,
                attributes: ['id', 'nick'] // 조회할 때 게시글 작성자의 아이디와 닉네임을 JOIN해서 제공한다.
            },
            order: [['createdAt', 'DESC']] // 게시글 순서는 최신순으로 정력했다.
        });
        res.render('main', {
            title: 'NodeBird',
            twits: posts // 조회한 뒤 결과를 twits에 넣어 렌더링한다.
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.renderHashtag = async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }
    try {
        // DB에서 해당 해시태그가 존재하는지 검색한 후, 해시태그가 있다면 시퀄라이즈에서 제공하는 getPosts 메서드로 모든 게시글을 가져온다.
        // 가져올 때 include를 통해 작성자 정보를 합친다.
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({ include: [{ model: User }] });
        }

        // 조회 후 메인 페이지를 렌더링하면서 전체 게시글 대신 조회된 게시글만 twits에 넣어 렌더링한다.
        return res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};