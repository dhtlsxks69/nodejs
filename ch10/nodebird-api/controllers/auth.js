const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

// 회원 가입 컨트롤러
exports.join = async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        // 같은 이메일로 가입한 사용자가 있다면 회원 가입 페이지로 되돌린다.
        // 단, 주소 뒤에 에러를 쿼리스트링으로 표시한다.
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        // 가입된 사용자가 없다면 비밀번호를 암호화하고 사용자 정보를 생성한다.
        const hash = await bcrypt.hash(password, 12); // bcrypt의 두 번째 인수는 pbkdf2의 반복 횟수와 비슷한 기능을 한다. 12이상을 추천하고 31까지 사용할 수 있다.
        await User.create({
            email,
            nick,
            password: hash
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
}

// 로그인 컨트롤러
exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        // 콜백 함수의 첫 번째 매개변수(authError) 값이 있다면 실패한 것이다.
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        // 두 번째 매개변수 자리는 사용자 정보이다.
        // 값이 있다면 성공한 것이고, 이 값으로 reqe.login 메서드를 호출한다.
        if (!user) {
            return res.redirect(`/?error=${info.message}`);
        }
        // req.login은 passport.serializeUser를 호출한다.
        // req.login에 제공하는 user 객체가 serializeUser로 넘어가게 된다.
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
};

// 로그아웃 컨트롤러
exports.logout = (req, res) => {
    req.logout(() => { // req.logout 메서드는 콜백 함수를 인수로 받고, 세션 정보를 지운 후 콜백 함수가 실행된다.
        res.redirect('/'); // 메인 페이지로 되돌아간다.
    });
};