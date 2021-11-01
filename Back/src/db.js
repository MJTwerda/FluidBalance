require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const modelUser = require('./models/User');
const modelPasives = require('./models/Pasives');
const modelActives = require('./models/Actives');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    logging: false
});

sequelize.authenticate().then(() => console.log('SUCCESS')).catch(err => console.log('NOT SUCCESS: ', err));

modelUser(sequelize);
modelPasives(sequelize);
modelActives(sequelize);

const { User, Pasives, Actives } = sequelize.models;

User.hasMany(Actives);
Actives.belongsTo(User);
User.hasMany(Pasives);
Pasives.belongsTo(User);

module.exports = {
    ...sequelize.models,
    connection: sequelize,
    Op
}