const { STRING } = require('sequelize');
const db = require('../connections.js');

const Place = db.define('Place', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true, // not sure this is correct
        allowEmpty: false,
    }
})

module.exports = Place