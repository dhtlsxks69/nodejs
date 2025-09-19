const axios = require('axios');

const URL = process.env.API_URL;
axios.defaults.headers.origin = process.env.ORIGIN; // origin 헤더 추가, 요청의 헤더 origin 값을 localhost:4000으로 설정한다.

// NodeBird API에 요청을 보내는 함수이다. 자주 사용되므로 함수로 분리했다.
const request = async (req, api) => {
    try {
        if (!req.session.jwt) { // 세션에 토큰이 없으면
            const tokenResult = await axios.post(`${URL}/token`, {
                clientSecret: process.env.CLIENT_SECRET // clientSecret을 사용해 토큰을 발급받는 요청을 보낸다.
            });
            req.session.jwt = tokenResult.data.token; // 재사용하기 위해 세션에 토큰 저장
        }
        // 발급받은 토큰을 이용해 API 요청을 보낸다.
        return await axios.get(`${URL}${api}`, {
            headers: { authorization: req.session.jwt }
        }); // API 요청
    } catch (error) {
        if (error.response?.status === 419) { // 토큰 만료 시 토큰 재발급받기
            delete req.session.jwt;
            return request(req, api);
        } // 419 외의 다른 에러이면
        throw error;
    }
};

exports.getMyPosts = async (req, res, next) => {
    try {
        const result = await request(req, '/posts/my');
        res.json(result.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.searchByHashtag = async (req, res, next) => {
    try {
        const result = await request(
            req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`
        );
        res.json(result.data);
    } catch (error) {
        if (error.code) {
            console.error(error);
            next(error);
        }
    }
};