const Sequelize = require('sequelize');

// 태그 이름을 저장한다.
// 해시태그 모델을 따로 두는 것은 나중에 태그로 검색하기 위해서이다.
class Hashtag extends Sequelize.Model {
    static initiate(sequelize) {
        Hashtag.init({
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    static associate(db) {
        // Hashtag 모델은 Post 모델과 N:M 관계이므로 관계를 설정했다.
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    }
};

module.exports = Hashtag;