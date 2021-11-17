const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        }
    })
}