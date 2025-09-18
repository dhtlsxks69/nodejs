const User = require('../models/user');

exports.follow = async (req, res, next) => {
    try {
        // 먼저 팔로우할 사용자를 DB에서 조회한 후, 시퀄라이즈에서 추가한 addFollowing 메서드로 현재 로그인한 사용자와의 관계를 지정한다.
        // 팔로잉 관계가 생겼으므로 req.user에도 팔로워와 팔로잉 목록을 저장한다.
        // 앞으로 사용자 정보를 불러올 때는 팔로워와 팔로잉 목록도 같이 불러오게 된다.
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user) { // req.user.id가 followerId, req.params.id가 followingId
            await user.addFollowing(parseInt(req.params.id, 10));
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};