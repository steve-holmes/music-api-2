'use strict';
module.exports = function (sequelize, DataTypes) {
    var Video = sequelize.define('Video', {
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
    return Video;
};
//# sourceMappingURL=video.js.map