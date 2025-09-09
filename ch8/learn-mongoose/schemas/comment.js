const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
    commenter: {
        type: ObjectId,
        required: true,
        ref: 'User' // 스키마의 사용자 ObjectId가 들어간다는 뜻이다. 나중에 몽구스가 JOIN과 비슷한 기능을 할 때 사용된다.
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);