const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Pasives', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        concept: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        }
    }
)};