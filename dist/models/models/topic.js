'use strict';
module.exports = function (sequelize, DataTypes) {
    var Topic = sequelize.define('Topic', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
            }
        }
    });
    return Topic;
};
//# sourceMappingURL=topic.js.map