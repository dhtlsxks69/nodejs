const jwt = require('jsonwebtoken');
const { Domain, User } = require('../models');

// 전달받은 클라이언트 비밀 키로 도메인이 등록된 것인지를 먼저 확인한다.
exports.createToken = async (req, res) => {
    const { clientSecret } = req.body;
    try {
        const domain = await Domain.findOne({
            where: { clientSecret }, // 클라이언트 비밀 키로 도메인이 등록된 것인지를 확인한다.
            include: {
                model: User,
                attribute: ['nick', 'id']
            }
        });
        if (!domain) { // 등록되지 않은 도메인이라면 에러 메시지로 응답하고, 등록된 도메인 이라면 토큰을 발급해서 응답한다.
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요'
            });
        }
        // 토큰은 jwt.sign 메서드로 발급받을 수 있다.
        const token = jwt.sign({ // 첫 번째 인수는 토큰의 내용이다. 사용자 아이디와 닉네임을 넣었다.
            id: domain.User.id,
            nick: domain.User.nick
        }, process.env.JWT_SECRET, { // 두 번째 인수는 토큰의 비밀 키이다.
            // 세 번째 인수는 토큰 설정이다.
            expiresIn: '1m', // 유효 기간, 1분, 60 * 1000처럼 밀리초 ㅗ단위로 적어도 된다.
            issuer: 'nodebird' // 발급자
        });
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다',
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: '서버 에러'
        });
    }
};

// 사용자가 발급받은 토큰을 테스트해볼 수 있는 라우터이다.
// 토큰을 검증하는 미들웨어를 거친 후, 검증이 성공했다면 토큰의 내용물을 응답으로 보낸다.
exports.tokenTest = (req, res) => {
    res.json(res.locals.decoded); // JSON 형태에 code, message 속성이 존재하고, 토큰이 있는 경우 token 속성도 존재한다.
};