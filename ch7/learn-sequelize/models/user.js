const Sequelize = require('sequelize');

class User extends Sequelize.Model { // User 모델을 만들고 모듈로 export(User 모델은 Sequelize.Model을 확장한 클래스)
    static initiate(sequelize) { // 테이블에 대한 설정 <-> static associate : 다른 모델과의 관계
        User.init({ // 모델.init : 첫 번째 인수 - 테이블 컬럼에 대한 설정
            name: {
                type: Sequelize.STRING(20), // STRING : MySQL의 VARCHAR
                allowNull: false, // MySQL의 NOT NULL과 동일
                unique: true // MySQL의 UNIQUE 옵션
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED, // INTEGER : MySQL의 INT, INTEGER.UNSIGNED는 UNSIGNED 옵션이 적용된 INT
                allowNull: false
            },
            married: {
                type: Sequelize.BOOLEAN, // BOOLEAN : MySQL의 TINYINT
                allowNull: false
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            created_at: {
                type: Sequelize.DATE, // DATE : MySQL의 DATETIME
                allowNull: false,
                defaultValue: Sequelize.NOW // 기본값(DEFAULT), Sequelize.NOW : 현재 시간을 기본값으로 사용(MySQL의 now()와 동일)
            }
        }, { // 모델.init : 두 번째 인수 : 테이블 자체에 대한 설정
            sequelize, // static initiate 메서드의 매개변수와 연결되는 옵션으로 db.sequelize 객체를 넣어야 한다. 나중에 model/index.js에서 연결
            timestamps: false, // true : 각각 레코드 생성, 수정될 때 시간이 자동으로 입력
            underscored: false, // 카멜 표기법을 스네이크 표기법으로 바꾸는 옵션. true : 스네이크(createdAt), false : 스네이크카멜(created_at)
            modelName: 'User', // 모델 이름 설정
            tableName: 'users', // DB의 테이블 이름
            paranoid: false, // true : deletedAt이라는 컬럼이 생기고 지운 시각이 기록된다.
            charset: 'utf8', // 한글이 입력되게 인코딩, 이모티콘까지 입력가능하게 하려면(utf8mb4, utf8mb4_general_ci를 입력)
            collate: 'utf8_general_ci'
        });
    }

    static associate(db) {
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    }
};

module.exports = User;