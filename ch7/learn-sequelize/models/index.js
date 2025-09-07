const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]; // config/config.json에서 DB 설정 불러옴
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config); // MySQL 연결 객체 생성

db.sequelize = sequelize; // 연결 객체를 나중에 재사용하기 위해 db.sequelize에 넣음

// db 객체에 User와 Comment 모델을 담았다.
db.User = User;
db.Comment = Comment;

// 각각 모델의 static initiate 메서드를 호출
// 모델.init이 실행되어야 테이블이 모델로 연결
User.initiate(sequelize);
Comment.initiate(sequelize);

// 다른 테이블과의 관계를 연결
User.associate(db);
Comment.associate(db);

module.exports = db;