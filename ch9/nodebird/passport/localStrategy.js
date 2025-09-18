const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.use(new LocalStrategy({ // LocalStrategy 생성자의 첫 번째 인수로 주어진 객체는 전략에 관한 설정을 하는 곳이다.
        usernameField: 'email', // usernameField와 passwordField에는 일치하는 로그인 라우터의 req.body 속성명을 적으면 된다.
        passwordField: 'password',
        passReqToCallback: false
    }, async (email, password, done) => { // 실제 전략을 수행하는 async 함수이다. LocalStrategy 생성자의 두 번째 인수로 들어간다.
        // 첫 번째 인수에서 넣어준 email과 password는 각각 async 함수의 첫 번째와 두 번째 매개변수가 된다.
        // 세 번째 매개변수인 done 함수는 routes/auth.js의 passport.authenticate의 콜백 함수이다.
        try {
            const exUser = await User.findOne({ where: { email } }); // DB에 일치하는 이메일 있는지 확인한다.
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password); // compare 함수로 비밀번호를 비교한다.
                if (result) { // 비밀번호까지 일치하는 경우
                    done(null, exUser); // done 함수의 두 번째 인수로 사용자 정보를 넣어 보낸다.
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};