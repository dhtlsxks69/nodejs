const mongoose = require('mongoose'); // 시퀄라이즈에서 모델을 정의하는 것과 비슷하다.

const { Schema } = mongoose;
const userSchema = new Schema({ // 몽구스 모듈에서 Schema 생성자를 사용해 스키마를 만든다.
    // 몽구스는 알아서 _id를 기본 키로 생성하므로 _id 필드는 적어줄 필요가 없다.
    name: {
        type: String, // 타입
        required: true, // 필수
        unique: true // 고유 값
    },
    age: {
        type: Number,
        required: true
    },
    married: {
        type: Boolean,
        required: true
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now // 기본 값 : 데이터 생성 당시의 시간
    }
});

module.exports = mongoose.model('User', userSchema); // 몽구스의 model 메서드로 스키마와 몽고디비 컬렉션을 연결하는 모델을 만든다.