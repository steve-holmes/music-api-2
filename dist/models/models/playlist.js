'use strict';
module.exports = function (sequelize, DataTypes) {
    var Playlist = sequelize.define('Playlist', {
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
    return Playlist;
};
//# sourceMappingURL=playlist.js.map