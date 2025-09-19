const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

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

// apiLimiter 미들웨어를 라우터에 넣으면 라우터에 사용량 제한이 걸린다.
exports.apiLimiter = rateLimit({
    window: 60 * 1000, // 기준시간, 1분
    max: 1, // 허용 횟수
    handler(req, res) { // 제한 초과 시 콜백 함수
        res.status(this.statusCode).json({
            code: this.statusCode, // 기본값 429
            message: '1분에 한 번만 요청할 수 있습니다.'
        });
    }
});

// deprecated 미들웨어는 사용하면 안 되는 라우터에 붙여줄 것이다.
exports.deprecated = (req, res) => {
    res.status(410).json({
        code: 410,
        message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.'
    });
};