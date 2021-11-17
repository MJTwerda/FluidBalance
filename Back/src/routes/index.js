const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors());
server.use(express.json());

const User = require('./User');
const Actives = require('./Actives');
const Events = require('./Events');

server.use('/', User);
server.use('/actives', Actives);
server.use('/event', Events);

module.exports = server;