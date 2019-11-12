const { STRING } = require('sequelize');
const db = require('../connections.js');

const Thing = db.define('Thing', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true, // not sure this is correct
        allowEmpty: false,
    }
})

module.exports = Thing