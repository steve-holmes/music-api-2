'use strict';
module.exports = function (sequelize, DataTypes) {
    var Song = sequelize.define('Song', {
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
    return Song;
};
//# sourceMappingURL=song.js.map