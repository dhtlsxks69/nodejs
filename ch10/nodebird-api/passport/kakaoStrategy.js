const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        // clientID는 카카오에서 발급해주는 아이디이다. 노출되지 않아야 하므로 process.env.KAKAO_ID 설정했다.
        // 나중에 아이디를 발급받아 .env 파일에 넣으면 된다.
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback' // 카카오로부터 인증 결과를 받을 라우터 주소이다.
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
            const exUser = await User.findOne({ // 카카오를 통해 회원 가입한 사용자가 있는지 조회한다.
                where: { snsId: profile.id, provider: 'kakao' }
            });
            // 있다면 이미 회원 가입되어 있는 경우이므로 사용자 정보와 함께 done 함수를 호출하고 전략을 종료한다.
            if (exUser) {
                done(null, exUser);
            } else { // 없다면 회원 가입응ㄹ 진행한다.
                // 카카오에서는 인증 후 callbackURL에 적힌 주소로 acessToken, refreshToken과 profile을 보낸다.
                const newUser = await User.create({
                    email: profile._json?.kakao_account?.email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao'
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};