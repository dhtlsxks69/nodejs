const Sequelize = require('sequelize');

class Domain extends Sequelize.Model {
    static initiate(sequelize) {
        Domain.init({
            host: { // 인터넷 주소
                type: Sequelize.STRING(80),
                allowNull: false
            },
            type: { // 도메인 종류
                type: Sequelize.ENUM('free', 'premium'),
                allowNull: false
            },
            clientSecret: { // 클라이언트 비밀 키(clientSecret) : 다른 개발자들이 NodeBird의 API를 사용할 때 필요한 비밀 키이다.
                type: Sequelize.UUID, // UUID는 충돌 가능성이 매우 적은 랜덤한 문자열이다.
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Domain',
            tableName: 'domains'
        });
    }

    static associate(db) {
        db.Domain.belongsTo(db.User); // 도메일 모델은 사용자 모델과 1:N 관계이다.
    }
};

module.exports = Domain;