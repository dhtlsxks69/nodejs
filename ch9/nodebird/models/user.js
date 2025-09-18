const Sequelize = require('sequelize');

// 사용자의 정보를 저장하는 모델이다.
class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            provider: {
                 // ENUM 속성은 넣을 수 있는 값을 제한하는 데이터 형식
                 // 이메일/비밀번호 로그인, 카카오 로그인 둘 중 선택
                type: Sequelize.ENUM('local', 'kakao'),
                allowNull: false,
                defaultValue: 'local' // 이메일/비밀번호 로그인이라 가정했을 때 defaultValue를 local 지정
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: true, // true로 한 경우 createdAt, updatedAt, deletedAt 컬럼 생성
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true, // true로 한 경우 createdAt, updatedAt, deletedAt 컬럼 생성
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    static associate(db) {
        // User 모델과 Post 모델은 1(User):N(Post) 관계에 있으므로 hasMany로 연결되어 있다.
        // 같은 모델끼리도 N:M 관계를 가질 수 있다. 팔로잉 기능이 대표적인 N:M 관계이다.
        // 사용자 한 명이 팔로워를 여러 명 가질 수도 있고, 한 사람이 여러 명을 팔로잉할 수도 있다.
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
            // foreignKey 옵션에 각각 followingId, followerId를 넣어줘서 두 사용자 아이디를 구별했다.
            foreignKey: 'followingId',
            // as는 foreignKey와 반대되는 모델을 가리킨다.
            as: 'Followers',
            // 같은 테이블 간 N:M 관계에서는 모델 이름과 컬럼 이름을 따로 정해야한다.
            // through 옵션을 사용해 생성할 모델 이름을 Follow로 정했다.
            through: 'Follow'
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow'
        });
    }
};

module.exports = User;