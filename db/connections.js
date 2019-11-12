const Sequelize = require('sequelize');
const pg = require('pg');

const connection = new Sequelize('postgres://localhost:5432/nouns', {
    logging: false,
}) // rememebr to create nouns db

module.exports = connection;