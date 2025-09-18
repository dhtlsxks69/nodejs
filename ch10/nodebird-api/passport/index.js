const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    // serializeUser는 로그인 시 실행되며, req.session 객체에 어떤 데이터를 저장할지 정하는 메서드이다.\
    // done 함수의 첫 번째 인수는 에러가 발생할 때 사용하는 것이고,
    // 두 번째 인수에는 저장하고 싶은 데이터를 넣는다.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // deserializeUser는 요청마다 실행된다.
    // passport.session 미들웨어가 이 메서드를 호출한다.
    // id는 serializerUser의 done으로 id 인자를 받는다.
    passport.deserializeUser((id, done) => {
        User.findOne({ // 세션에 저장된 아이디로 정보를 조회할 때 팔로잉 목록과 팔로워 목록도 같이 조회한다.
            where: { id },
            include: [{ // include에서 attributes를 지정하고 있는데, 이는 실수로 비밀번호를 조회하는 것을 방지하기 위해서이다.
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers'
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings'
            }]
        })
        .then(user => done(null, user)) // req.user에 저장하므로 앞으로 req.user을 통해 로그인한 사용자의 정보를 가져올 수 있다.
        .catch(err => done(err));
    });

    local();
    kakao();
}