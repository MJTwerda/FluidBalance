const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors());
server.use(express.json());

const Home = require('./User');
const Actives = require('./Actives');
const Pasives = require('./Pasives');

server.use('/', Home);
server.use('/actives', Actives);
server.use('/pasives', Pasives);

module.exports = server;