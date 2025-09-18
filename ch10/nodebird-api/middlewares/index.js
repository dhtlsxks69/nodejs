const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        // 요청 헤더에 저장된 토큰(req.headers.authorization)을 사용한다.
        // jwt.verify 메서드로 토큰을 검증할 수 있다.
        // 첫 번째 인수로 토큰을, 두 번째 인수로 토큰의 비밀 키를 넣는다.
        // 토큰의 비밀 키가 일치하지 않거나, 유효기간이 지난 경우에 에러가 발생해 catch문으로 이동한다.
        res.locals.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // 유효 기간 초과
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다'
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다'
        });
    }
};