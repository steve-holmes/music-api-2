'use strict';
module.exports = function (sequelize, DataTypes) {
    var Singer = sequelize.define('Singer', {
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
    return Singer;
};
//# sourceMappingURL=singer.js.map