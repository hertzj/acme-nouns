const { STRING } = require('sequelize');
const db = require('../connections.js');

const Person = db.define('Person', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true, // not sure this is correct
        allowEmpty: false,
    }
})

module.exports = Person