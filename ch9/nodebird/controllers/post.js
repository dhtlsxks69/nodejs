const { Post, Hashtag } = require('../models');

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id
        });
        const hashtags = req.body.content.match(/#[^\s#]*/g); // 게시글 내용에서 해시태그를 정규표현식(/#[^\s#]*/g)으로 추출한다.
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => {
                    // findOrCreate 메서드 : DB에 해시태그가 존재하면 가져오고, 존재하지 않으면 생성한 후 가져온다.
                    // 결괏값으로 [모델, 생성여부]를 반환하므로 result.map(r => r[0])으로 모델만 추출했다.
                    return Hashtag.findOrCreate({
                        // 추출한 해시태그는 DB에 저장하는데, 먼저 slice(1).toLowerCase()를 사용해 해시태그에서 #을 떼고 소문자로 바꾼다.
                        where: { title: tag.slice(1).toLowerCase() }
                    })
                })
            );
            // 해시태그 모델들을 post.addHashtags 메서드로 게시글과 연결한다.
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};